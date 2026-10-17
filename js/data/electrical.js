/* Question bank: Electrical Circuits, Electromagnetism & Electrostatics. */
(() => {
  const R = String.raw;
  const Q = (o) => window.QB.push(o);
  window.QB = window.QB || [];

  /* ───────────── ELECTRICAL CIRCUITS ───────────── */

  Q({ id: 'ci-cube', topic: 'circuits', diff: 4, mins: 10,
    title: 'Resistor cube',
    q: R`Twelve identical resistors $R$ form the edges of a cube. Find the resistance between (a) opposite corners of the cube, (b) the two ends of one edge, (c) opposite corners of one face.`,
    hints: [
      R`Use symmetry. Points at the same potential can be joined without changing anything.`,
      R`(a) From the input corner, the current splits equally into three edges. The three nodes one step away are at the same potential, and so are the three nodes two steps away.`,
      R`(b) and (c) are harder. Inject a current $I$ at one node and remove it at the other, then use symmetry to find each edge current.`
    ],
    sol: R`<b>(a)</b> The current $I$ splits $I/3$ into each of 3 edges, then $I/6$ through each of the 6 middle edges, then $I/3$ through each of the last 3. Voltage $= \tfrac{I}{3}R + \tfrac I6R + \tfrac I3R = \tfrac56IR$, so $R_\text{eq} = \tfrac56R$.

<b>(b)</b> Superposition. Situation 1: inject $I$ at A and remove $I/7$ at each of the other 7 nodes. By symmetry each edge from A carries $I/3$, so edge AB carries $I/3$ from A to B. Situation 2: remove $I$ at B and inject $I/7$ at each of the other nodes. Again AB carries $I/3$ from A to B. Adding them, the $I/7$ terms cancel at the six other nodes, leaving a net $\tfrac87I$ in at A and out at B, with $\tfrac23I$ in edge AB. So
$$R_{AB} = \frac{\tfrac23IR}{\tfrac87I} = \frac{7}{12}R.$$

<b>(c)</b> Face diagonal A to C: by the reflection symmetry through A and C, the two face-neighbours of A are equipotential, and so are the far-face nodes symmetric about the plane of A and C. Merging them and using nodal analysis on the reduced network gives $\tfrac34R$.

Sanity check: $\tfrac{7}{12} < \tfrac34 < \tfrac56$. The resistance increases as the nodes get further apart. ✓`,
    insight: R`Exploit symmetry to merge equipotential nodes. Superposition is the powerful general method for the harder cases.`,
    follow: R`Foster's theorem says that for any connected network of $N$ nodes, summing the edge resistance between the ends of every edge (each in units of $R$) gives $N - 1$. Check it with (b): $12\times\tfrac{7}{12} = 7 = 8 - 1$ ✓. Can you use this to get (b) instantly?`
  });

  Q({ id: 'ci-ladder', topic: 'circuits', diff: 3, mins: 7,
    title: 'Infinite resistor ladder',
    q: R`An infinite ladder network has resistors $R$ along the top rail and resistors $R$ on each rung (the bottom rail has no resistance). Find the input resistance. How many sections do you need to be within 1% of it?`,
    hints: [
      R`Adding one more section to the front of an infinite ladder leaves it unchanged.`,
      R`$R_\infty = R + (R \parallel R_\infty)$.`
    ],
    sol: R`$R_\infty = R + \dfrac{RR_\infty}{R + R_\infty} \Rightarrow R_\infty^2 - RR_\infty - R^2 = 0 \Rightarrow R_\infty = \dfrac{1+\sqrt5}{2}R = \varphi R \approx 1.618R$.

Finite ladders give $R_n/R = 1, 1.5, 1.6, 1.625, 1.615, \dots$, ratios of Fibonacci numbers. The error shrinks by a factor of about $\varphi^2 \approx 2.6$ per section, so <b>4–5 sections</b> are within 1%. Ladders converge fast.`,
    insight: R`Self-similarity again. Notice the golden ratio and the Fibonacci link, and quantify how fast it converges.`,
    follow: R`This is a model for an attenuator, or a long transmission line. What happens to the voltage at each successive rung?`
  });

  Q({ id: 'ci-grid', topic: 'circuits', diff: 5, mins: 12,
    title: 'Infinite grid of resistors',
    q: R`An infinite square grid has a resistor $R$ on every edge. Find the resistance between two adjacent nodes.`,
    hints: [
      R`Superposition. First inject current $I$ at node A and let it flow out to infinity.`,
      R`By symmetry, $I/4$ flows along each of the four edges from A, including the edge to B.`,
      R`Now separately extract $I$ at B, with current coming in from infinity. Add the two situations.`
    ],
    sol: R`<b>Step 1:</b> inject $I$ at A, sink at infinity. By symmetry, the current in edge AB is $I/4$ (from A to B).

<b>Step 2:</b> source at infinity, extract $I$ at B. Again $I/4$ flows from A to B.

Superposed, the net effect is $I$ in at A and out at B, with $I/2$ in edge AB. So $V_{AB} = \tfrac{I}{2}R$, and
$$R_\text{eq} = \frac{R}{2}.$$`,
    insight: R`Superposition plus symmetry cracks infinite networks. This is one of the most famous interview problems, so know it cold.`,
    follow: R`What about the diagonal nodes of one square? (Answer: $2R/\pi$. It needs Fourier methods.) What about an infinite triangular or hexagonal grid between adjacent nodes?`
  });

  Q({ id: 'ci-discharge', topic: 'circuits', diff: 3, mins: 8,
    title: 'Discharging a capacitor',
    q: R`(Commonly cited as a Cambridge Engineering question.) A capacitor $C$ charged to $V_0$ discharges through a resistor $R$. Use Kirchhoff's laws to derive the differential equation, solve it, and show that the energy dissipated in the resistor equals the energy originally stored.`,
    hints: [
      R`$Q = CV$ and $I = -\dfrac{dQ}{dt}$ (the charge on the capacitor decreases).`,
      R`Kirchhoff's voltage law: $V_C = IR$.`
    ],
    sol: R`$V = IR = -RC\dfrac{dV}{dt} \Rightarrow V(t) = V_0e^{-t/RC}$. The time constant is $\tau = RC$.

Energy dissipated:
$$\int_0^\infty I^2R\,dt = \int_0^\infty\frac{V_0^2}{R}e^{-2t/RC}dt = \frac{V_0^2}{R}\cdot\frac{RC}{2} = \tfrac12CV_0^2. \checkmark$$`,
    insight: R`State the sign convention clearly. Checking energy conservation is a great habit that interviewers notice.`,
    follow: R`After how many time constants is 99% of the energy gone? (Energy decays as $e^{-2t/\tau}$, so about $2.3\tau$.)`
  });

  Q({ id: 'ci-charging-loss', topic: 'circuits', diff: 4, mins: 9,
    title: 'Half the energy always lost',
    q: R`A battery of EMF $V$ charges an uncharged capacitor $C$ through a resistor $R$. How much energy does the battery supply, and how much ends up in the capacitor? Show the loss is independent of $R$. How could you charge the capacitor more efficiently?`,
    hints: [
      R`The battery moves charge $Q = CV$ through potential difference $V$.`,
      R`The capacitor stores $\tfrac12CV^2$.`
    ],
    sol: R`Battery work: $QV = CV^2$. Stored: $\tfrac12CV^2$. So <b>exactly half</b> is dissipated in the resistor, whatever $R$ is. (Check: $\int I^2R\,dt = \tfrac12CV^2$, and the $R$ cancels, as in the discharge case.)

A smaller $R$ just means a bigger current for a shorter time. Even with $R \to 0$, the energy goes into radiation and sparks.

More efficient: ramp the supply voltage up slowly so the voltage across $R$ stays small (adiabatic charging). With $N$ equal steps, the loss falls to $\tfrac{1}{2N}CV^2$. Or charge through an inductor, which stores energy instead of dissipating it (as switch-mode power supplies do).`,
    insight: R`A result that's independent of a parameter is a hint to look at energy and charge conservation, not the details.`,
    follow: R`Two identical capacitors, one charged to $V$ and one uncharged, are connected together. Find the final voltage and the energy lost. Where did it go if the wires had zero resistance?`
  });

  Q({ id: 'ci-two-caps', topic: 'circuits', diff: 4, mins: 9,
    title: 'Capacitors in series, then in parallel',
    q: R`Two identical capacitors $C$ are connected in series across a battery $V$ and fully charged. They're then disconnected and reconnected in parallel with each other: positive plate to positive plate. Find the final voltage and the energy before and after. Now repeat with positive connected to negative.`,
    hints: [
      R`In series, each carries the same charge $Q = \tfrac{C}{2}V$, with $V/2$ across each.`,
      R`Charge on connected plates is conserved.`
    ],
    sol: R`In series each has $Q = CV/2$ and voltage $V/2$. Energy: $2\times\tfrac12C(V/2)^2 = \tfrac14CV^2$.

<b>Like plates joined:</b> each already has $V/2$, so nothing flows. The voltage stays $V/2$ and the energy is unchanged ($\tfrac14CV^2$).

<b>Opposite plates joined:</b> the total charge on each connected pair is $+Q - Q = 0$, so the capacitors fully discharge each other. Final voltage 0, final energy 0. All $\tfrac14CV^2$ is dissipated in the wires (or radiated as a spark).`,
    insight: R`Charge conservation on isolated conductors decides everything. Energy doesn't have to be conserved because the wires dissipate it.`,
    follow: R`Now take capacitors $C$ and $2C$ charged in series to $V$, then connected in parallel with like plates together. Final voltage? Energy lost?`
  });

  Q({ id: 'ci-max-power', topic: 'circuits', diff: 3, mins: 7,
    title: 'Maximum power transfer',
    q: R`A battery has EMF $E$ and internal resistance $r$. What load resistance draws the most power from it, and what is that power? What's the efficiency at that point? Why don't power stations operate there?`,
    hints: [
      R`$P = I^2R_L = \dfrac{E^2R_L}{(R_L + r)^2}$.`
    ],
    sol: R`$\dfrac{dP}{dR_L} = 0 \Rightarrow R_L = r$, giving $P_\text{max} = \dfrac{E^2}{4r}$.

Efficiency $= \dfrac{R_L}{R_L + r} = 50\%$: half the power is wasted heating the source.

Power stations and the grid aim for <b>efficiency</b>, not maximum power from a given source, so they keep $R_L \gg r$. Matching is used where the source is weak and signal power matters most: antennas, audio amplifiers, radio receivers.`,
    insight: R`"Maximum power" and "maximum efficiency" are different design goals. Making that distinction is the engineering insight.`,
    follow: R`A solar panel isn't a simple EMF + resistor. How does a "maximum power point tracker" work?`
  });

  Q({ id: 'ci-transmission', topic: 'circuits', diff: 3, mins: 8,
    title: 'Why transmit at high voltage?',
    q: R`A power station sends 1 GW down a line with a total resistance of 5 Ω. Compare the losses when transmitting at 400 kV and at 25 kV. Why not go to even higher voltages? Why is DC sometimes used?`,
    hints: [
      R`$I = P/V$, and $P_\text{loss} = I^2R$.`
    ],
    sol: R`At 400 kV: $I = 2500$ A, so $P_\text{loss} = 2500^2\times5 \approx 31$ MW (3%).

At 25 kV: $I = 40\,000$ A, so $P_\text{loss} = 8$ GW, more than the power being sent: impossible. Losses scale as $1/V^2$.

Limits on going higher: insulation and clearance (taller pylons, bigger insulators), <b>corona discharge</b> (the air ionises around conductors), and cost of transformers and switchgear.

HVDC is used for very long lines and undersea cables. There are no reactive (capacitive or inductive) losses or skin effect, it can link asynchronous grids, and it needs only two conductors. But the converter stations are expensive.`,
    insight: R`Quantify with numbers, show the scaling law, then discuss the practical limits. That's a model engineering answer.`,
    follow: R`Why do we use AC at all, then? (Transformers, simple generators, and historically easier switching.)`
  });

  Q({ id: 'ci-voltmeter', topic: 'circuits', diff: 3, mins: 6,
    title: 'Voltmeter loading',
    q: R`Two 100 kΩ resistors in series form a divider across 10 V. You measure the voltage across one with a voltmeter of internal resistance 1 MΩ. What does it read? What would it read if the resistors were 1 kΩ? What does this teach you about measurement?`,
    hints: [
      R`The voltmeter is in parallel with the resistor it's measuring.`
    ],
    sol: R`$100\text{ k}\parallel1\text{ M} = 90.9$ kΩ, so the reading is $10\times\dfrac{90.9}{190.9} \approx$ <b>4.76 V</b> instead of 5 V: a 5% error.

With 1 kΩ resistors: $1\text{ k}\parallel1\text{ M} \approx 0.999$ kΩ, so the reading is $\approx 4.9975$ V, with a negligible error.

The lesson: an instrument changes what it measures. It needs an impedance much larger than the circuit's (voltmeters) or much smaller (ammeters). Thinking about how your measurement disturbs the system is a key engineering skill.`,
    insight: R`Model the instrument as part of the circuit. Loading effects appear everywhere: thermometers, sensors, oscilloscope probes.`,
    follow: R`How could you measure the voltage accurately with this voltmeter anyway? (A null method or potentiometer: balance it against a known voltage so no current flows.)`
  });

  Q({ id: 'ci-bridge', topic: 'circuits', diff: 4, mins: 12,
    title: 'Unbalanced bridge',
    q: R`Nodes A and B are the input and output. Resistors: A–C $R$, A–D $R$, C–B $R$, D–B $2R$, and a bridge resistor C–D $R$. Find the resistance between A and B, and the current in the bridge resistor for an applied voltage $V$.`,
    hints: [
      R`The bridge isn't balanced ($R/R \ne R/2R$), so you can't ignore the middle resistor.`,
      R`Set $V_A = V$, $V_B = 0$ and apply Kirchhoff's current law at C and D.`
    ],
    sol: R`At C: $\dfrac{V - V_C}{R} = \dfrac{V_C}{R} + \dfrac{V_C - V_D}{R} \Rightarrow V = 3V_C - V_D$.

At D: $\dfrac{V - V_D}{R} + \dfrac{V_C - V_D}{R} = \dfrac{V_D}{2R} \Rightarrow 2V + 2V_C = 5V_D$.

Solving: $V_C = \tfrac{7}{13}V$, $V_D = \tfrac{8}{13}V$.

Current from A: $\dfrac{V - V_C}{R} + \dfrac{V - V_D}{R} = \dfrac{11V}{13R}$, so $R_{AB} = \dfrac{13}{11}R \approx 1.18R$.

Bridge current: $\dfrac{V_D - V_C}{R} = \dfrac{V}{13R}$, flowing from D to C.

Check: without the bridge resistor it would be $2R\parallel3R = 1.2R$. Adding a path lowers the resistance slightly ✓.`,
    insight: R`Nodal analysis is systematic and always works. Check against a simpler limiting case.`,
    follow: R`What value of D–B makes the bridge balanced? How does a strain-gauge Wheatstone bridge use this to measure tiny resistance changes?`
  });

  Q({ id: 'ci-rc-filter', topic: 'circuits', diff: 4, mins: 10,
    title: 'What does an RC circuit do to a sine wave?',
    q: R`A sinusoidal voltage $V_\text{in}$ of angular frequency $\omega$ is applied to a resistor $R$ in series with a capacitor $C$. The output is taken across the capacitor. Find the gain $|V_\text{out}/V_\text{in}|$ and the phase shift. Sketch the gain against frequency and explain what the circuit is for.`,
    hints: [
      R`Use complex impedance: $Z_C = \dfrac{1}{i\omega C}$.`,
      R`It's a potential divider: $\dfrac{V_\text{out}}{V_\text{in}} = \dfrac{Z_C}{R + Z_C}$.`
    ],
    sol: R`$$H = \frac{1/(i\omega C)}{R + 1/(i\omega C)} = \frac{1}{1 + i\omega RC},\qquad |H| = \frac{1}{\sqrt{1 + (\omega RC)^2}},\qquad \phi = -\arctan(\omega RC).$$
At low frequency, $|H|\to1$ (the capacitor is effectively an open circuit). At high frequency, $|H|\approx\dfrac{1}{\omega RC}$, falling off at 20 dB per decade. The corner is at $\omega_c = 1/RC$, where $|H| = 1/\sqrt2$ (−3 dB) and $\phi = -45^\circ$.

It's a <b>low-pass filter</b>: it removes high-frequency noise and smooths signals. Swap $R$ and $C$ and you get a high-pass filter.`,
    insight: R`Complex impedance turns AC circuits into DC-style algebra. Always check the limits $\omega\to0$ and $\omega\to\infty$ physically.`,
    follow: R`Without complex numbers: a capacitor current leads the voltage by 90°. Show the same result with a phasor diagram.`
  });

  Q({ id: 'ci-rectifier', topic: 'circuits', diff: 4, mins: 10,
    title: 'Making DC from AC',
    q: R`Design a circuit that turns 50 Hz AC into roughly steady DC for a device drawing 0.5 A. Explain the role of each component. Estimate the capacitor needed to keep the ripple below 1 V.`,
    hints: [
      R`A diode conducts in one direction only. A bridge of four diodes rectifies both halves of the cycle.`,
      R`Between peaks, the capacitor supplies the load current: $\Delta V \approx \dfrac{I\,\Delta t}{C}$.`
    ],
    sol: R`Transformer (to step down the voltage and isolate the circuit) → bridge rectifier (full-wave: both halves made positive, peaks at 100 Hz) → smoothing capacitor across the load (charges at each peak, discharges slowly in between) → optionally a voltage regulator.

Ripple: between peaks ($\Delta t \approx 10$ ms for full-wave), $\Delta V \approx \dfrac{I\Delta t}{C}$, so
$$C \ge \frac{0.5\times0.01}{1} = 5000\ \mu\text{F}.$$
With half-wave rectification you'd need twice as much. Also note each diode drops about 0.7 V, and the charging current comes in large short pulses, which stresses the diodes.`,
    insight: R`Explain the function of each block, then size a component with a one-line estimate. That's exactly the engineering mindset interviewers want.`,
    follow: R`Modern phone chargers don't use 50 Hz transformers. Why are switch-mode supplies so much smaller?`
  });

  Q({ id: 'ci-lc', topic: 'circuits', diff: 4, mins: 9,
    title: 'LC oscillator',
    q: R`A charged capacitor $C$ is connected across an inductor $L$. Derive the equation for the charge, find the frequency of oscillation, and draw the analogy with a mass on a spring. What happens if you add a resistor?`,
    hints: [
      R`The voltage across an inductor is $L\,dI/dt$, and $I = dQ/dt$.`,
      R`Kirchhoff: $\dfrac{Q}{C} + L\dfrac{dI}{dt} = 0$.`
    ],
    sol: R`$L\ddot Q + \dfrac{Q}{C} = 0 \Rightarrow \omega = \dfrac{1}{\sqrt{LC}}$.

Analogy: $L \leftrightarrow m$ (inertia, because it resists changes in current), $1/C \leftrightarrow k$ (stiffness), $Q \leftrightarrow x$, $I \leftrightarrow v$. Energy sloshes between the capacitor's electric field ($\tfrac12Q^2/C$, like spring PE) and the inductor's magnetic field ($\tfrac12LI^2$, like KE).

Adding $R$ gives $L\ddot Q + R\dot Q + Q/C = 0$, the damped oscillator ($R \leftrightarrow$ damping $c$). Critical damping is at $R = 2\sqrt{L/C}$.`,
    insight: R`Mechanical–electrical analogies let you transfer intuition both ways. Interviewers love it when you spot them unprompted.`,
    follow: R`How does a radio tuner use this to select one station? What does a high "Q factor" mean here?`
  });

  Q({ id: 'ci-bulbs', topic: 'circuits', diff: 3, mins: 6,
    title: 'Two bulbs in series',
    q: R`A 60 W and a 100 W bulb, both rated at 230 V, are connected in series across 230 V. Which is brighter, and roughly what power does each dissipate? What real-world effect makes your estimate inaccurate?`,
    hints: [
      R`Find each resistance from $R = V^2/P$.`,
      R`In series, the same current flows, so $P = I^2R$ favours the larger resistance.`
    ],
    sol: R`$R_{60} = 230^2/60 \approx 882$ Ω and $R_{100} \approx 529$ Ω. The current is $230/1411 \approx 0.163$ A.

$P_{60} \approx 0.163^2\times882 \approx 23$ W and $P_{100} \approx 14$ W. <b>The 60 W bulb is brighter.</b>

Caveat: filament resistance rises strongly with temperature (about ten times from cold to hot). Both bulbs run cooler than rated, so their resistances are lower than calculated. The 100 W bulb may barely glow, which makes the difference even more pronounced in practice.`,
    insight: R`The rated power is for a specific voltage. Derive the resistance and recalculate. Then question the assumption of constant resistance.`,
    follow: R`In parallel, which is brighter? Why do household circuits use parallel wiring?`
  });

  /* ───────────── ELECTROMAGNETISM & ELECTROSTATICS ───────────── */

  Q({ id: 'em-magnet-tube', topic: 'em', diff: 3, mins: 8,
    title: 'Magnet falling through a copper pipe',
    q: R`A strong magnet dropped down a vertical copper pipe falls very slowly. Copper isn't magnetic. Explain what's happening, and argue why it reaches a terminal velocity. How would the speed change with a thicker pipe, or an aluminium pipe?`,
    hints: [
      R`The changing flux through each ring of the pipe induces an EMF, which drives eddy currents.`,
      R`By Lenz's law, the currents oppose the change, which means a retarding force.`,
      R`The force is proportional to the speed.`
    ],
    sol: R`As the magnet falls, the flux through rings of the pipe ahead of it increases and behind it decreases. Faraday's law induces EMFs, which drive <b>eddy currents</b>. By Lenz's law these produce fields that repel the approaching magnet and attract the receding one: a drag force.

The EMF is $\propto$ the rate of change of flux $\propto v$, so the current and force are $\propto v$ ($F = kv$). The terminal velocity is reached when $kv = mg$. The gravitational PE lost is dissipated as heat in the pipe.

A thicker wall gives a lower resistance, so larger currents, a bigger $k$ and slower fall. Aluminium has higher resistivity than copper ($2.8$ vs $1.7\times10^{-8}$ Ω m) but is used in similar demos. The fall is somewhat faster. A slit along the pipe breaks the circumferential current path and the magnet falls almost freely.`,
    insight: R`Faraday + Lenz + energy conservation. Explaining where the energy goes completes the answer.`,
    follow: R`Where is this used? (Eddy current brakes on trains and roller coasters, induction cooking, metal detectors.)`
  });

  Q({ id: 'em-parallel-wires', topic: 'em', diff: 3, mins: 7,
    title: 'Force between parallel wires',
    q: R`Two long parallel wires a distance $d$ apart carry currents $I_1$ and $I_2$. Find the force per unit length, and whether it's attractive or repulsive. Estimate the force between the two conductors of a kettle lead carrying 13 A, about 5 mm apart.`,
    hints: [
      R`The field of a long wire is $B = \dfrac{\mu_0I}{2\pi d}$.`,
      R`The force on a current-carrying wire is $F = BIL$.`
    ],
    sol: R`$$\frac{F}{L} = \frac{\mu_0I_1I_2}{2\pi d}.$$
Currents in the same direction attract; opposite directions repel. (Until 2019, this defined the ampere: 1 A in each wire 1 m apart gives $2\times10^{-7}$ N/m.)

Kettle lead (currents opposite, so it repels): $\dfrac{2\times10^{-7}\times13^2}{0.005}\approx 7$ mN per metre. Tiny. But in a short circuit with 10 kA, the force is 4 million times bigger, which is why busbars must be braced.`,
    insight: R`State the result, the direction rule and a numerical estimate. The "scale it up" follow-on shows engineering awareness.`,
    follow: R`Why does a lightning strike sometimes crush a metal tube inward? (The pinch effect: the current attracts itself.)`
  });

  Q({ id: 'em-cyclotron', topic: 'em', diff: 4, mins: 9,
    title: 'Charged particle in a magnetic field',
    q: R`A particle of charge $q$ and mass $m$ moves at speed $v$ perpendicular to a uniform field $B$. Find the radius and period of its orbit. Explain why the period's independence of speed made the cyclotron possible. Then design a velocity selector using crossed $E$ and $B$ fields.`,
    hints: [
      R`The magnetic force $qvB$ is always perpendicular to the velocity, so it does no work. It provides the centripetal force.`,
      R`In a velocity selector, the electric and magnetic forces balance for one particular speed.`
    ],
    sol: R`$qvB = \dfrac{mv^2}{r} \Rightarrow r = \dfrac{mv}{qB}$, and $T = \dfrac{2\pi r}{v} = \dfrac{2\pi m}{qB}$, which is independent of $v$.

Cyclotron: two D-shaped electrodes with an alternating voltage at the fixed frequency $qB/2\pi m$. Each time the particle crosses the gap it's accelerated, spirals at a larger radius, but arrives back at the gap in step with the field reversal. It breaks down at relativistic speeds, when the effective mass grows.

Velocity selector: $E$ perpendicular to $B$, both perpendicular to $v$. Undeflected when $qE = qvB$, so $v = E/B$, whatever the charge or mass.`,
    insight: R`Magnetic forces do no work, so they change direction, not speed. Mass spectrometers combine a selector with an $r = mv/qB$ stage.`,
    follow: R`If the velocity has a component along $B$, what is the path? (A helix. That's how particles get trapped in Earth's magnetic field and make aurorae.)`
  });

  Q({ id: 'em-rail', topic: 'em', diff: 5, mins: 12,
    title: 'Sliding rod on rails',
    q: R`A conducting rod of mass $m$ and length $\ell$ slides without friction on two horizontal rails joined by a resistor $R$. A uniform vertical field $B$ acts. The rod is given initial speed $v_0$. Find $v(t)$ and how far it travels. Check energy conservation. Then replace the resistor with a battery of EMF $E$, starting from rest: what's the terminal speed?`,
    hints: [
      R`Motional EMF: $\mathcal E = B\ell v$. Current: $I = B\ell v/R$.`,
      R`Force on the rod: $BI\ell$, opposing its motion.`,
      R`With a battery, the current is $(E - B\ell v)/R$. Terminal speed when it's zero.`
    ],
    sol: R`$m\dot v = -\dfrac{B^2\ell^2}{R}v \Rightarrow v = v_0e^{-t/\tau}$, with $\tau = \dfrac{mR}{B^2\ell^2}$.

Distance: $x = v_0\tau = \dfrac{mRv_0}{B^2\ell^2}$.

Energy: $\int I^2R\,dt = \dfrac{B^2\ell^2}{R}\int v^2\,dt = \dfrac{B^2\ell^2}{R}\cdot\dfrac{v_0^2\tau}{2} = \tfrac12mv_0^2$ ✓.

With a battery: $I = \dfrac{E - B\ell v}{R}$, which drives the rod forward. Terminal speed when the back-EMF equals $E$: $v_\infty = \dfrac{E}{B\ell}$. This is exactly how a DC motor works: no load, no current, and speed set by the back-EMF.`,
    insight: R`EMF → current → force → motion → EMF: a feedback loop that gives a first-order ODE. Linking it to motors and generators earns credit.`,
    follow: R`Add a constant opposing force (a load) $F$. What's the terminal speed and the efficiency? Show it's an electric motor model.`
  });

  Q({ id: 'em-transformer', topic: 'em', diff: 3, mins: 8,
    title: 'How does a transformer work?',
    q: R`Explain how a transformer works, and derive the ideal voltage and current ratios. Why must it be AC? Why is the core laminated? What are the main losses?`,
    hints: [
      R`The same changing flux passes through both coils (one core). Faraday's law per turn.`,
      R`Energy conservation for an ideal transformer: $V_pI_p = V_sI_s$.`
    ],
    sol: R`An alternating primary current creates an alternating flux $\Phi$ in the iron core, which links both coils. EMF per turn is $d\Phi/dt$, so $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$. With no losses, $\dfrac{I_s}{I_p} = \dfrac{N_p}{N_s}$.

DC gives constant flux and zero induced EMF, and the primary is then just a coil of wire: a short circuit.

Laminations: the changing flux also induces eddy currents in the iron itself. Thin insulated sheets cut the current paths and reduce the loss.

Losses: copper ($I^2R$ in the windings), eddy currents, hysteresis (energy lost in repeatedly magnetising the iron), and flux leakage. Large transformers reach 99%+ efficiency.`,
    insight: R`Explain mechanism → equation → limitations. That's the structure for all "how does X work" questions.`,
    follow: R`Why do transformers hum at 100 Hz, not 50? (Magnetostriction happens twice per cycle.)`
  });

  Q({ id: 'em-sphere', topic: 'em', diff: 4, mins: 9,
    title: 'Van de Graaff and lightning rods',
    q: R`Air breaks down at an electric field of about 3 MV/m. What's the maximum voltage you can hold on a metal sphere of radius 10 cm? Why are lightning rods pointed? Why is the field inside the sphere zero?`,
    hints: [
      R`For a sphere, $V = \dfrac{Q}{4\pi\varepsilon_0r}$ and $E_\text{surface} = \dfrac{Q}{4\pi\varepsilon_0r^2} = \dfrac Vr$.`,
      R`Points have a small radius of curvature.`
    ],
    sol: R`$E = V/r \le 3\times10^6$, so $V_\text{max} = 3\times10^6\times0.1 = $ <b>300 kV</b>. Bigger spheres hold higher voltages, which is why big Van de Graaffs have big domes.

A sharp point at potential $V$ has a tiny $r$, so a huge field. The air ionises locally and charge leaks away gradually (corona discharge). A lightning rod provides a preferred, safe path to earth for the strike.

Inside a conductor in equilibrium, $E = 0$, or charges would move. Gauss's law with a surface just inside the metal encloses no charge, so all the charge is on the outer surface. A hollow conductor shields its interior (a Faraday cage).`,
    insight: R`$E = V/r$ for a sphere explains both the size of the dome and the sharpness of the rod. The same scaling, opposite design goals.`,
    follow: R`Why are you safe in a car during a thunderstorm, but not in a convertible? Is it the tyres?`
  });

  Q({ id: 'em-generator', topic: 'em', diff: 3, mins: 8,
    title: 'Generator and back-EMF',
    q: R`A coil of $N$ turns and area $A$ rotates at angular speed $\omega$ in a uniform field $B$. Find the EMF. Why does a generator get harder to turn when a load is connected? Why does a motor draw a huge current when it's stalled?`,
    hints: [
      R`$\Phi = NBA\cos\omega t$ and $\mathcal E = -d\Phi/dt$.`,
      R`The current in the coil feels a force in the field. Which way, by Lenz's law?`
    ],
    sol: R`$\mathcal E = NBA\omega\sin\omega t$, with peak value $NBA\omega$.

With a load, current flows. The current-carrying coil in the field feels a torque opposing the rotation (Lenz). The mechanical power you supply equals the electrical power delivered plus losses. With no load, there's no current and no opposing torque, apart from friction.

A motor is a generator in reverse. Spinning, it produces a back-EMF $\propto\omega$ that opposes the supply: $I = (V - k\omega)/R$. When stalled, $\omega = 0$, so $I = V/R$, which is huge because the winding resistance is small. That's why motors use soft-start circuits and why stalled motors burn out.`,
    insight: R`Energy conservation and Lenz's law explain everyday experience (a dynamo is harder to pedal when the light is on).`,
    follow: R`How does regenerative braking in an electric car work, and what limits how much energy is recovered?`
  });
})();
