# DFA Minimization Visualizer

## Overview
The DFA Minimization Visualizer is a web-based tool that allows users to input a Deterministic Finite Automaton (DFA) and visualize its transitions. The visualization includes labeled transitions, a red arrow for the start state, and double circles for final states.

## Features
- Users can define states, alphabets, transitions, start state, and final states.
- Graphical representation of the DFA with directed arrows.
- Labels on arrows indicating transition symbols.
- The start state is marked with a red arrow.
- Final states are represented with double circles.
- Ensures proper visualization of the user-defined DFA.

## Technologies Used
- **HTML** for structuring the webpage.
- **CSS** for styling the interface.
- **JavaScript** with **D3.js** for rendering the DFA graph.

## How to Use
1. Open the HTML file in a browser.
2. Click the **Enter DFA & Visualize** button.
3. Input the required DFA components:
   - States (comma-separated)
   - Alphabet symbols (comma-separated)
   - Transition table (user-defined per state and symbol)
   - Start state
   - Final states (comma-separated)
4. The visualized DFA graph appears on the screen.

## Visual Representation
- **Nodes (Circles):** Represent DFA states.
- **Edges (Arrows):** Show state transitions.
- **Red Arrow:** Indicates the start state.
- **Double Circles:** Denote final states.

## Known Issues
- Ensure that all inputs match the defined states and alphabet to avoid visualization errors.
- If extra arrows appear, verify the transition inputs for redundancy.

## Future Enhancements
- Implement DFA minimization logic.
- Allow file input for DFA definition.
- Improve UI with interactive controls and animations.

## License
This project is open-source and available for modification and distribution.

