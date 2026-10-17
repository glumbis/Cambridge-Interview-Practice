/* Topic list. `weight` = how likely the topic is to come up in a Cambridge
   Engineering interview (3 = high, 2 = medium, 1 = lower). Weights are based on
   the Cambridge Engineering Department's own practice-problem distribution
   (i-want-to-study-engineering.org) and reported interview content: mechanics
   and maths dominate, then circuits, then the rest. */
window.TOPICS = [
  { id: 'statics',      name: 'Statics & Structures',            weight: 3, blurb: 'Equilibrium, moments, friction, beams, cables' },
  { id: 'dynamics',     name: 'Dynamics & Energy',               weight: 3, blurb: 'Newton, energy, momentum, projectiles, orbits' },
  { id: 'rotation',     name: 'Rotation & Circular Motion',      weight: 3, blurb: 'Moments of inertia, rolling, loops, angular momentum' },
  { id: 'calculus',     name: 'Calculus & Differential Equations', weight: 3, blurb: 'Integration tricks, ODEs, optimisation, series' },
  { id: 'algebra',      name: 'Algebra, Functions & Graphs',     weight: 3, blurb: 'Curve sketching, roots, complex numbers, proof' },
  { id: 'circuits',     name: 'Electrical Circuits',             weight: 3, blurb: 'Kirchhoff, networks, capacitors, AC, power' },
  { id: 'oscillations', name: 'Springs & Oscillations',          weight: 2, blurb: 'SHM, damping, resonance, coupled systems' },
  { id: 'geometry',     name: 'Geometry & Shapes',               weight: 2, blurb: 'Areas, volumes, vectors, optimal shapes' },
  { id: 'probability',  name: 'Probability & Logic',             weight: 2, blurb: 'Puzzles, expectation, game theory, information' },
  { id: 'em',           name: 'Electromagnetism',                weight: 2, blurb: 'Induction, fields, forces, motors, generators' },
  { id: 'fluids',       name: 'Fluids & Waves',                  weight: 2, blurb: 'Buoyancy, Bernoulli, lift, Doppler, dimensional analysis' },
  { id: 'thermo',       name: 'Thermodynamics & Power',          weight: 2, blurb: 'Heat engines, fridges, gases, heat transfer' },
  { id: 'estimation',   name: 'Estimation & Modelling',          weight: 2, blurb: 'Fermi problems, scaling, first-principles numbers' },
  { id: 'materials',    name: 'Materials & Design',              weight: 1, blurb: 'Stress, stiffness, buckling, choosing materials' },
  { id: 'personal',     name: 'Motivation & Wider Engineering',  weight: 1, blurb: 'Why engineering, your statement, ethics' }
];
