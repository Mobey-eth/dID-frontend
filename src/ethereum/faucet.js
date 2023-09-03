import { ethers } from "ethers";

const faucetABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_studentAddress",
        type: "address",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_studentAddress",
        type: "address",
      },
    ],
    name: "approveDeleteforStudentProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_students",
        type: "address[]",
      },
    ],
    name: "batchApprove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
      {
        internalType: "string",
        name: "_docName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_docHash",
        type: "string",
      },
    ],
    name: "createProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "Burn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_role",
        type: "uint256",
      },
    ],
    name: "deleteRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum AccessControl.Roles",
        name: "_role",
        type: "uint8",
      },
    ],
    name: "DeleteUserRole",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_regNo",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_department",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_profileID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "removeProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "RemoveProfile",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_studentAddress",
        type: "address",
      },
    ],
    name: "revokeApprove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_studentAddress",
        type: "address",
      },
    ],
    name: "revokeApproveDeleteforProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "profileID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "SetProfile",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "STUDENT",
        type: "address",
      },
    ],
    name: "StudentApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "STUDENT",
        type: "address",
      },
    ],
    name: "StudentApprovedToDelete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "STUDENT",
        type: "address",
      },
    ],
    name: "StudentRevoked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_regNo",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_department",
        type: "string",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "Update",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_role",
        type: "uint256",
      },
    ],
    name: "updateRoles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum AccessControl.Roles",
        name: "_role",
        type: "uint8",
      },
    ],
    name: "UpdateUserRole",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum AccessControl.Roles",
        name: "",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accountToRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Approved",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvedToDelete",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_profileID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "getProfile",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "regNo",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "department",
            type: "string",
          },
          {
            internalType: "string",
            name: "docName",
            type: "string",
          },
          {
            internalType: "string",
            name: "docHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct DecentralisedIdentityManagement.StudentDoc",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "getStudent",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "regNo",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "department",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct DecentralisedIdentityManagement.Student",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_profileID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "hasProfile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "hasStudent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_student",
        type: "address",
      },
    ],
    name: "listProfiles",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "studentCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "studentProfileCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "studentProfiles",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "regNo",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "department",
        type: "string",
      },
      {
        internalType: "string",
        name: "docName",
        type: "string",
      },
      {
        internalType: "string",
        name: "docHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ticker",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const faucetContract = (provider) => {
  return new ethers.Contract(
    "0x52431E400898Dbb9b8b90c554BAc455505F8714D",
    faucetABI,
    provider
  );
};

// new contract = 0x52431E400898Dbb9b8b90c554BAc455505F8714D
// old contract = 0x4471d975e436195A6581FC04A62e433166FA7394
