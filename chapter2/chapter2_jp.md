---
marp: true
theme: uncover
backgroundColor: #0a1628
color: #ffffff
style: |
  section {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(135deg, #0a1628 0%, #1a2332 100%);
    padding: 20px;
    line-height: 1.35;
    text-align: center;
  }
  h1, h2, h3 {
    color: #5eb3e6;
    font-weight: 300;
    margin-top: 0;
    line-height: 1.15;
  }
  h1 {
    font-size: 2.1em;
    margin-bottom: 0.2em;
  }
  h2 {
    font-size: 1.7em;
    color: #5eb3e6;
    margin-bottom: 0.2em;
  }
  h3 {
    font-size: 1.0em;
    color: #ffffff;
    margin-bottom: 0.2em;
    text-align: left;
  }
  ul {
    text-align: left !important;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    padding-left: 1em;
    list-style: none;
  }
  ul li {
    text-align: left !important;
    margin-bottom: 0.35em;
    font-size: 0.8em;
    line-height: 1.35;
    position: relative;
  }
  ul li:before {
    content: "✓ ";
    color: #5eb3e6;
    font-weight: bold;
    display: inline-block;
    margin-left: -1em;
    width: 1em;
  }
  ul li::marker {
    display: none;
  }
  code {
    background-color: #1e2936;
    color: #5eb3e6;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.95em;
  }
  pre {
    background-color: #1e2936;
    border: 1px solid #2a3f5f;
    border-radius: 8px;
    padding: 0.7em;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    font-size: 0.9em;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2em;
    text-align: left;
  }
  .columns ul {
    text-align: left !important;
  }
  .highlight {
    color: #5eb3e6;
  }
  a {
    color: #5eb3e6;
    font-size: 0.95em;
  }
  .subtitle {
    color: #b8c5d6;
    font-size: 0.9em;
    margin-top: 0.25em;
  }
  p {
    font-size: 0.8em;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    line-height: 1.35;
  }
  ol {
    text-align: left !important;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    padding-left: 1.2em;
  }
  ol li {
    font-size: 0.8em;
    line-height: 1.35;
    margin-bottom: 0.35em;
  }
  .compact {
    font-size: 0.9em;
  }
  .compact h3 {
    font-size: 1.1em;
    margin-bottom: 0.15em;
  }
  .compact ul li {
    font-size: 0.95em;
    margin-bottom: 0.25em;
    line-height: 1.25;
  }
  .compact p {
    font-size: 0.9em;
    line-height: 1.25;
  }
  /* Ultra small text utility for dense slides */
  .text-04 p,
  .text-04 ul li,
  .text-04 ol li,
  .text-04 a,
  .text-04 .subtitle {
    font-size: 0.4em;
    line-height: 1.3;
  }
---

# Introduction to Move

### Objectives:
• Build smart contracts on Sui with strong foundations and patterns
• Learn Move language and the unique Sui object-centric model

---

# Agenda

1. What is Move?
2. Toolchain & Environment Setup
3. Variables, Data Types, and Mutability
4. Sui's Smart Contract Patterns
5. Capabilities in Sui
6. Error Handling and Security Practices

---

# Learning Objectives

• Key takeaways: Move ensures safety, Sui's object model and capabilities enable advanced patterns.
• Explore resources and exercises for deeper learning.
• Sui Developer Portal for further resources.
(https://sui.io/developers)

---

# What is Move?

### Safe & Flexible
Move is designed for secure and adaptable smart contracts on Sui.

### Resource-oriented
It manages assets safely, preventing common vulnerabilities like reentrancy.

### Sui Usage
Move controls on-chain objects, ensuring efficient and secure data management.

---

# Toolchain & Environment Setup

### **Install Sui CLI**
Ensure scarcity and prevent duplication of digital assets.

### **Initialize a new package**
`sui move new <project>`

---

## Variables, Data Types, and Mutability

### Ownership model
Variables follow Rust-like ownership rules for memory safety.

### Data types
- bool: true/false
- u8, u64: unsigned integers
- address: account identifiers
- vector: dynamic arrays

### Mutability
`let` creates immutable variables, `let mut` makes them mutable.

(https://move-book.com/reference/primitive-types)

---

# Resources and Objects

### **Resources**
Ensure scarcity and prevent duplication of digital assets.

### **Objects**
Sui's core data structures; can be owned, shared, or immutable.

### **Ownerships**
Wrapping enforces single ownership to avoid unauthorized copies.

### **Transfer**
Use transfer::transfer to safely move object ownership.

---

<!-- class: compact -->

# Models and Functions

<div class="columns">
<div>

### Modules
Contain code defining structs and functions for organization.

### Functions
Serve as entry points implementing on-chain business logic.

</div>
<div>

### Visibility
**Public:** accessible within modules
**Private:** restricted access
**Entry:** callable from transactions

### Example
A module creating and managing fungible tokens on Sui.

</div>
</div>

---

## Basic Structure of a Move Project

### Move.toml
- The main configuration file of the project
- Contains information about the project name, dependencies, and published addresses
- Similar to package.json in NodeJS or Cargo.toml in Rust

### sources/
- Directory containing the main source code of the project
- .move files contain smart contract code
- Each Move module is defined in a separate file

### tests/
- Directory containing test files
- Test files usually have the suffix _test.move
- Used to write unit tests for smart contracts

---

# Common Design Patterns

### Data as objects
Sui's model stores data as objects (owned or shared)

### Capabilities in Sui
Capabilities control access, ensuring only authorized actions

### One-time Witness Pattern
Ensures an action can only be performed once by a uniquely created object as proof.

---

# Security Considerations

<div class="columns">
<div>

### Gas Optimization
Minimize costs to avoid denial-of-service from expensive transactions.

</div>
<div>

### Reentrancy Prevention
Resource model helps block reentrancy attacks efficiently.

### Formal Verification
Mathematically prove critical contract logic correctness.

</div>
</div>

---

# Practical Exercises

• Sui Documentation: Writing Your First Smart Contract for guidance.
(https://docs.sui.io/guides/developer/writing-your-first-smart-contract)

• Build a smart contract: creating a token, transferring ownership, managing resources with capabilities.

---

# Thank You.
