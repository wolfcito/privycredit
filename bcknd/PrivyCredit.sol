// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * ZK-CreditProof Demo (essentials only)
 * - Owner ancla una raíz (epochRoot) por época (simula el root Merkle de pruebas ZK).
 * - Usuario registra una "prueba sellada" con un commitment (bytes32) + bandas por factor.
 * - Verificador (tu front) consulta verifyBands(proofId, minBands) => true/false sin PII.
 *
 * NOTA: Esto es DEMO. No verifica ZK on-chain. La prueba real se comprueba off-chain
 * y aquí solo se ancla el root/epoch para trazabilidad + lectura de bandas.
 *
 * VERSIÓN SIMPLIFICADA: Sin validación de epoch para facilitar testing.
 */
contract PrivyCredit {
    /* ----------------------------- Tipos & datos ---------------------------- */

    enum Band {
        A,
        B,
        C
    } // 0=A (mejor), 1=B, 2=C (mínimo visible)

    struct Factors {
        Band stability; // continuidad/antigüedad de señales
        Band inflows; // inflows en banda
        Band risk; // sin liquidaciones / drawdown
    }

    struct Proof {
        address user;
        uint64 epoch; // ventana temporal a la que pertenece
        bytes32 commitment; // hash de la prueba (sellada)
        Factors factors; // SOLO bandas, jamás montos
        bool valid;
        uint64 createdAt;
    }

    address public owner;

    // epoch => anchored root (simula Merkle root de las pruebas validadas off-chain)
    mapping(uint64 => bytes32) public epochRoot;

    // proofId => Proof
    mapping(bytes32 => Proof) public proofs;

    /* -------------------------------- Eventos ------------------------------- */

    event OwnerChanged(address indexed oldOwner, address indexed newOwner);
    event RootAnchored(uint64 indexed epoch, bytes32 indexed root);
    event ProofSubmitted(
        bytes32 indexed proofId,
        address indexed user,
        uint64 indexed epoch,
        bytes32 commitment,
        Factors factors
    );
    event ProofRevoked(bytes32 indexed proofId);

    /* ------------------------------- Modifiers ------------------------------ */

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    /* ------------------------------- Constructor ---------------------------- */

    constructor() {
        owner = msg.sender;
        emit OwnerChanged(address(0), msg.sender);
    }

    /* ------------------------------ Owner ops -------------------------------- */

    /// @notice Cambia owner (simple para demo)
    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero addr");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    /// @notice Ancla la raiz (root) de una época (simula el Merkle root off-chain)
    function anchorRoot(uint64 epoch, bytes32 root) external onlyOwner {
        require(root != bytes32(0), "invalid root");
        epochRoot[epoch] = root;
        emit RootAnchored(epoch, root);
    }

    /// @notice Revoca una prueba previamente registrada
    function revokeProof(bytes32 proofId) external onlyOwner {
        require(proofs[proofId].valid, "not found/valid");
        proofs[proofId].valid = false;
        emit ProofRevoked(proofId);
    }

    /* ------------------------------- Usuario -------------------------------- */

    /**
     * @notice Registra una prueba "sellada" para la época dada.
     * @dev Para DEMO asumimos que el backend ya validó ZK y que esta prueba
     * pertenece al root anclado. Aquí solo grabamos commitment + bandas.
     *
     * VERSIÓN SIMPLIFICADA: Sin validación de epoch para facilitar testing.
     */
    function submitProof(
        bytes32 proofId,
        uint64 epoch,
        bytes32 commitment,
        Band stability,
        Band inflows,
        Band risk
    ) external {
        // COMENTADO PARA DEMO: require(epochRoot[epoch] != bytes32(0), "epoch not anchored");
        require(proofId != bytes32(0) && commitment != bytes32(0), "bad ids");
        require(!proofs[proofId].valid, "proof exists");

        Factors memory f = Factors({
            stability: stability,
            inflows: inflows,
            risk: risk
        });

        proofs[proofId] = Proof({
            user: msg.sender,
            epoch: epoch,
            commitment: commitment,
            factors: f,
            valid: true,
            createdAt: uint64(block.timestamp)
        });

        emit ProofSubmitted(proofId, msg.sender, epoch, commitment, f);
    }

    /* ----------------------------- Lecturas (view) -------------------------- */

    /// @notice Devuelve un resumen legible para UI
    function getProofSummary(
        bytes32 proofId
    )
        external
        view
        returns (
            address user,
            uint64 epoch,
            bytes32 commitment,
            Band stability,
            Band inflows,
            Band risk,
            bool valid,
            uint64 createdAt
        )
    {
        Proof memory p = proofs[proofId];
        return (
            p.user,
            p.epoch,
            p.commitment,
            p.factors.stability,
            p.factors.inflows,
            p.factors.risk,
            p.valid,
            p.createdAt
        );
    }

    /**
     * @notice Verifica si la prueba cumple bandas mínimas requeridas.
     * @dev Convención: A=0 (mejor), B=1, C=2 (mínimo). Cumple si prueba <= umbral.
     * Ej.: requerir estabilidad<=B (1) significa A o B pasan.
     */
    function verifyBands(
        bytes32 proofId,
        Band minStability,
        Band minInflows,
        Band minRisk
    ) external view returns (bool ok) {
        Proof memory p = proofs[proofId];
        if (!p.valid) return false;

        bool sOK = uint8(p.factors.stability) <= uint8(minStability);
        bool iOK = uint8(p.factors.inflows) <= uint8(minInflows);
        bool rOK = uint8(p.factors.risk) <= uint8(minRisk);
        return (sOK && iOK && rOK);
    }
}
