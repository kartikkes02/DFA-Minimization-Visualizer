function getUserDFA() {
    let states = prompt("Enter states (comma-separated):").split(",").map(s => s.trim());
    let alphabet = prompt("Enter alphabet symbols (comma-separated):").split(",").map(s => s.trim());
    let transitions = {};
    
    states.forEach(state => {
        transitions[state] = {};
        alphabet.forEach(symbol => {
            let targetState = prompt(`Enter transition for state ${state} on input ${symbol}:`).trim();
            if (states.includes(targetState)) {
                transitions[state][symbol] = targetState;
            }
        });
    });
    
    let startState = prompt("Enter start state:").trim();
    let finalStates = prompt("Enter final states (comma-separated):").split(",").map(s => s.trim());
    
    return { states, alphabet, transitions, startState, finalStates };
}

function visualizeDFA(dfa) {
    d3.select("svg").remove();
    let width = 500, height = 500;
    let svg = d3.select("#dfaContainer").append("svg").attr("width", width).attr("height", height);
    let radius = Math.min(width, height) / 3;

    let nodes = dfa.states.map((state, index) => ({
        id: state,
        x: width / 2 + radius * Math.cos(2 * Math.PI * index / dfa.states.length),
        y: height / 2 + radius * Math.sin(2 * Math.PI * index / dfa.states.length)
    }));

    let links = [];
    let seenTransitions = new Set();
    for (let state in dfa.transitions) {
        for (let symbol in dfa.transitions[state]) {
            let targetState = dfa.transitions[state][symbol];
            if (dfa.states.includes(targetState)) {
                let key = `${state}-${symbol}-${targetState}`;
                if (!seenTransitions.has(key)) {
                    links.push({ source: state, target: targetState, label: symbol });
                    seenTransitions.add(key);
                }
            }
        }
    }

    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "black");
    
    svg.append("defs").append("marker")
        .attr("id", "redArrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "red");

    svg.selectAll(".link").data(links).enter().append("line")
        .attr("x1", d => nodes.find(n => n.id === d.source).x)
        .attr("y1", d => nodes.find(n => n.id === d.source).y)
        .attr("x2", d => nodes.find(n => n.id === d.target).x)
        .attr("y2", d => nodes.find(n => n.id === d.target).y)
        .attr("stroke", "black")
        .attr("marker-end", "url(#arrow)");

    svg.selectAll(".link-label").data(links).enter().append("text")
        .attr("x", d => (nodes.find(n => n.id === d.source).x + nodes.find(n => n.id === d.target).x) / 2)
        .attr("y", d => (nodes.find(n => n.id === d.source).y + nodes.find(n => n.id === d.target).y) / 2)
        .attr("dy", -5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(d => d.label);
    
    svg.selectAll(".node").data(nodes).enter().append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 20)
        .attr("fill", "lightblue")
        .attr("stroke", d => dfa.finalStates.includes(d.id) ? "black" : "none")
        .attr("stroke-width", d => dfa.finalStates.includes(d.id) ? 3 : 1);

    svg.selectAll(".label").data(nodes).enter().append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(d => d.id);
    
    let startNode = nodes.find(n => n.id === dfa.startState);
    if (startNode) {
        svg.append("line")
            .attr("x1", startNode.x - 40)
            .attr("y1", startNode.y)
            .attr("x2", startNode.x - 20)
            .attr("y2", startNode.y)
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#redArrow)");
    }
}

function startDFAProcess() {
    let userDFA = getUserDFA();
    visualizeDFA(userDFA);
}