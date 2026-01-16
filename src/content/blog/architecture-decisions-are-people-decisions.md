---
title: "Architecture Decisions Are People Decisions"
description: "Conway's Law isn't just an observation — it's a design tool. How organizational structure shapes system architecture and what to do about it."
pubDate: 2024-11-28
category: "architecture"
tags: ["architecture", "Conway's Law", "team topology", "organizational design"]
draft: false
---

In 1967, Melvin Conway made an observation that has haunted software architects ever since:

> "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."

We call this Conway's Law, though it's less a law and more an inevitability — as fundamental to software as gravity is to physics.

## The Law in Action

Let me give you an example I've seen play out multiple times. Company X has three backend teams: Auth, Payments, and Core API. Each team owns a service. When Product asks for a new feature that requires coordinated changes across all three, what happens?

The teams create APIs between their services. These APIs become contracts. The contracts become bureaucracy. Soon, changing anything requires three teams to coordinate, three PRs to merge, and three deployments to orchestrate.

The architecture now reflects the organizational structure: three distinct islands connected by bridges, rather than a cohesive system designed for the actual user flows.

## The Inverse Conway Maneuver

Here's the insight that changed how I think about architecture: **Conway's Law works in both directions.**

If your organization's structure produces a certain architecture, you can also design your organization to produce the architecture you want. This is sometimes called the "Inverse Conway Maneuver."

Want a microservices architecture? Create small, autonomous teams with clear domain boundaries.

Want a well-integrated monolith? Co-locate teams and remove barriers to cross-team collaboration.

Want smooth user experiences that span multiple technical domains? Create teams organized around user journeys, not technical layers.

## Team Topologies as Architecture Patterns

The "Team Topologies" framework by Matthew Skelton and Manuel Pais formalizes this thinking. They identify four fundamental team types:

1. **Stream-aligned teams** — Aligned to a flow of work from a segment of the business domain
2. **Enabling teams** — Help stream-aligned teams overcome obstacles and adopt new approaches
3. **Complicated-subsystem teams** — Own parts of the system that require specialist knowledge
4. **Platform teams** — Provide internal services to reduce cognitive load of stream-aligned teams

Each topology produces different architectural patterns. Platform teams naturally create platform architectures. Stream-aligned teams naturally create domain-driven boundaries.

## Practical Implications

So what does this mean for your next architectural decision?

### 1. Before Drawing Boxes, Draw Reporting Lines

When designing a new system, start by asking: "Given our current organization, what architecture will naturally emerge?" Then ask: "Is that the architecture we want?"

If the answers don't match, you have two options:
- Change the organizational structure
- Accept that you'll be fighting Conway's Law forever

### 2. Architecture Reviews Should Include Org Charts

I've started bringing organizational context into architecture discussions. "This design assumes Team A and Team B will collaborate closely on the data layer. Looking at our org structure, they report to different directors with different priorities. How do we address this?"

### 3. Communication Overhead Is Technical Debt

Every unnecessary team boundary creates communication overhead. Every additional API, contract, or integration point is a tax on velocity. Sometimes these boundaries are necessary — but often they exist for historical or political reasons rather than technical ones.

### 4. Consider the Human API

When two services need to communicate, consider not just the technical interface but the human interface:

- How easy is it for developers on Team A to understand Team B's service?
- Can they debug issues without context-switching?
- Is the documentation sufficient for autonomous operation?

## The Uncomfortable Truth

Here's what we don't like to admit: many architectural problems are actually organizational problems in disguise.

That service that's always breaking? Maybe it's not a technical issue — maybe it's owned by a team that's spread too thin, or lacks the right skills, or has misaligned incentives.

That integration that's always delayed? Maybe it's not scope creep — maybe it requires coordination across teams that don't share goals or timelines.

The best architects I know understand that their job isn't just to design systems. It's to design systems that humans can actually build and maintain, given the organizational context they operate in.

Architecture decisions are people decisions. The sooner we embrace that, the better our systems become.

---

*How has Conway's Law manifested in your organization? I'm always curious to hear examples — especially cases where teams successfully applied the Inverse Conway Maneuver.*
