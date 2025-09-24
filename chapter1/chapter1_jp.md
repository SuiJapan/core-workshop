---
marp: true
theme: uncover
backgroundColor: #0a1628
color: #ffffff
style: |
  section {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
    padding: 60px;
  }
  h1, h2, h3 {
    color: #5eb3e6;
    font-weight: 300;
    margin-top: 0;
  }
  h1 {
    font-size: 2.0em;
    margin-bottom: 0.2em;
  }
  h2 {
    font-size: 1.6em;
    color: #5eb3e6;
    margin-bottom: 0.2em;
  }
  h3 {
    font-size: 1.2em;
    color: #ffffff;
    margin-bottom: 0.2em;
  }
  ul {
    text-align: left;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  ul li {
    margin-bottom: 0.4em;
    font-size: 1.05em;
  }
  ul li::marker {
    color: #5eb3e6;
  }
  code {
    background-color: #1e2936;
    color: #5eb3e6;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
  pre {
    background-color: #1e2936;
    border: 1px solid #2a3f5f;
    border-radius: 8px;
    padding: 0.8em;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
  }
  .highlight {
    color: #5eb3e6;
  }
  a {
    color: #5eb3e6;
  }
  .subtitle {
    color: #b8c5d6;
    font-size: 0.9em;
    margin-top: 0.3em;
  }
  p {
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
---

# Sui 101
## Introduction to Sui

<p class="subtitle">Audience: Students, Web2 Devs, Crypto Curious</p>

---

# Learning Objective

✓ Understands the basics of Sui and blockchain

✓ Set up a Sui wallet to interact with the network

✓ Mint an NFT on the Sui blockchain

---

# What is Sui?

• A high-performance Layer 1 blockchain focused on speed and scalability
• Centered around assets and objects
• Uses the Move programming language

---

# How is Sui Different?
## Object-Centric Model

• Assets on the Sui blockchain are called **objects**
• Each object has a unique ID and can store data or be modified
• This model is different from account-based blockchains

---

# What is a blockchain?

• Distributed ledger technology
• Immutable and transparent record-keeping
• Transactions stored across a network of computers

---

# Intro to Move Language and Sui CLI

• Move language is a safe and flexible smart contract programming language

• Sui CLI is a command-line tool for interacting with the Sui network

---

# Basic Transactions:
## Mint an NFT, Send Tokens

• Mint a simple NFT on Sui testnet

• Transfer tokens to another wallet

---

# Quiz + Hands-On Challenge

<div class="columns">
<div>

### Mini Quiz

• What is Sui's object model?
• How is Move different from Solidity?

</div>
<div>

### Challenge

• Deploy an NFT smart contract
• Mint NFT by calling smart contract function

**Screenshot & Submit**

</div>
</div>

---

# Summary

• What blockchain is and how Sui works
• How Sui's object-centric model is unique
• Basic wallet setup, Move, and transactions

### Resources

• [docs.sui.io](https://docs.sui.io)
• Sui Wallet
• Sui Developer Forum

---

# Set up you Slush Wallet

### Install Slush
### Back Up Seed Phrase
### Get Sui from Faucet

---

# Get SUI from the Faucet

1. Go to a Sui testnet faucet site
2. Paste your address
3. Request testnet tokens

---

# Explore Your Wallet Interface

1. Token balance in SUI
2. Minted NFT collections

---

# Install Sui CLI

**macOS** `brew install sui`

**Windows** `Winget install sui`

**Linux** `0 ALTER`

---

# CLI Command Walkthrough

① `Sui client new-address`

② `Sui client transfer-sui`

③ `Sui client call`

---

## Entry Functions & Structs

1. Entry functions = executable functions
2. Structs = custom data types

```rust
Module counter {
  Struct Counter has key, store {
    value: u64;
  }
  public entry fun increment
    (my_counter: &mut Counter)
    my_counter.value += 1;
  }
}
```

---

# View Your Module

1. Go to Sui Explorer
   [https://suiscan.xyz/mainnet/home](https://suiscan.xyz/mainnet/home)

2. Search for your Move module

---

# Top Student Questions

• What is the Sui wallet recovery process?
• How do I connect my Sui wallet to dApps?
• Where can I find more resources on Move?
• Is this course really beginner-friendly?

---

# Next: Builder Track Preview

• Focus on writing and deploying contracts
• Understanding gas and storage

---

# Thank You.