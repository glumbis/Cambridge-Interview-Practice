/* Question bank: Statics, Dynamics, Rotation, Oscillations.
   Text uses KaTeX: $inline$ and $$display$$. Blank lines separate paragraphs. */
(() => {
  const R = String.raw;
  const Q = (o) => window.QB.push(o);
  window.QB = window.QB || [];

  /* ───────────── STATICS & STRUCTURES ───────────── */

  Q({ id: 'st-ladder', topic: 'statics', diff: 4, mins: 10,
    title: 'The ladder that slips',
    q: R`A uniform ladder of length $L$ and weight $W$ leans against a smooth vertical wall, making angle $\theta$ with the rough horizontal floor (coefficient of friction $\mu$).

(a) Find the smallest $\theta$ for which the ladder does not slip.

(b) A person of weight $W$ climbs the ladder. How far up can they go before it slips?`,
    hints: [
      R`Draw the free-body diagram: weight at the midpoint, normal reaction $N$ and friction $F$ at the floor, a horizontal reaction $S$ at the smooth wall.`,
      R`Resolve vertically and horizontally, then take moments about the foot of the ladder. That eliminates two unknowns at once.`,
      R`Slipping is imminent when $F = \mu N$.`
    ],
    sol: R`<b>(a)</b> Vertically: $N = W$. Horizontally: $F = S$. Moments about the foot:
$$S\,L\sin\theta = W\,\tfrac{L}{2}\cos\theta \;\Rightarrow\; S = \frac{W}{2\tan\theta}.$$
No slip requires $F \le \mu N$, i.e. $\dfrac{W}{2\tan\theta} \le \mu W$, so
$$\tan\theta \ge \frac{1}{2\mu}.$$

<b>(b)</b> With the person a distance $x$ up the ladder, $N = 2W$ and moments about the foot give
$$S L \sin\theta = W\cos\theta\left(\tfrac{L}{2} + x\right).$$
Requiring $S \le 2\mu W$:
$$\frac{x}{L} \le 2\mu\tan\theta - \tfrac12.$$
If this exceeds 1 they can reach the top; if it is negative the ladder slips before they start.`,
    insight: R`Take moments about the point where the most unknown forces act. Friction is an inequality ($F \le \mu N$), not an equation, until the point of slipping.`,
    follow: R`Now make the wall rough too, with the same $\mu$. Show the condition becomes $\tan\theta \ge \dfrac{1-\mu^2}{2\mu}$. What happens when $\mu \ge 1$? (The ladder stands at any angle. Can you explain that physically?)`
  });

  Q({ id: 'st-supports', topic: 'statics', diff: 5, mins: 12,
    title: 'Where to put the supports',
    q: R`A long uniform beam of length $L$ carries its own weight $w$ per unit length. You may place two supports anywhere under it, symmetrically. Where should they go to minimise the largest bending moment in the beam? By roughly what factor is this better than supporting it at its ends?`,
    hints: [
      R`With supports a distance $a$ in from each end, there are two candidate places for the maximum moment: over a support (hogging) and at mid-span (sagging).`,
      R`The hogging moment over a support comes only from the overhang: $\tfrac12 w a^2$.`,
      R`The optimum is when the hogging and sagging magnitudes are equal. Moving the supports either way makes one of them worse.`
    ],
    sol: R`Each reaction is $wL/2$. Over a support the moment is from the overhang alone: $M_s = \tfrac12 w a^2$.

At mid-span, taking moments of everything to the left:
$$M_m = \frac{wL}{2}\left(\frac{L}{2}-a\right) - \frac{w}{2}\left(\frac{L}{2}\right)^2 = \frac{wL^2}{8} - \frac{wLa}{2}.$$

Set $|M_s| = |M_m|$: $\;a^2 + La - \tfrac{L^2}{4} = 0$, so
$$a = \frac{\sqrt2 - 1}{2}L \approx 0.207L.$$

The maximum moment is then $\tfrac12 w a^2 \approx 0.0214\,wL^2$, against $wL^2/8 = 0.125\,wL^2$ for end supports, roughly <b>six times smaller</b>.`,
    insight: R`An "optimal" design usually balances two competing failure modes. That's why it happens where they are equal. You'll see the same pattern on many optimisation questions.`,
    follow: R`Why might a real engineer still not put the supports at $0.207L$? Think about deflection at the ends, how the load is applied in service, and what happens if the beam is used upside down.`
  });

  Q({ id: 'st-cable-beam', topic: 'statics', diff: 3, mins: 7,
    title: 'Hinged beam and cable',
    q: R`A uniform horizontal beam of length $L$ and weight $W$ is hinged to a wall at one end. A cable from its free end goes back to the wall, making angle $\theta$ with the beam. A load $2W$ hangs from the free end.

Find the cable tension and the magnitude and direction of the hinge reaction. What changes if the cable is fixed to the beam's midpoint instead?`,
    hints: [
      R`Take moments about the hinge so the unknown hinge reaction disappears.`,
      R`Then resolve horizontally and vertically to get the two components of the hinge force.`
    ],
    sol: R`Moments about the hinge: $T\sin\theta\,L = W\tfrac{L}{2} + 2W L$, so
$$T = \frac{5W}{2\sin\theta}.$$
Hinge: horizontal $H = T\cos\theta = \dfrac{5W}{2\tan\theta}$ (pushing the beam away from the wall). Vertical: $V = 3W - T\sin\theta = \tfrac12 W$ upwards.

With the cable at the midpoint: $T\sin\theta\,\tfrac L2 = \tfrac{5}{2}WL$, so $T = \dfrac{5W}{\sin\theta}$ (doubled). Now $V = 3W - 5W = -2W$: the hinge must pull <b>down</b>. The hinge force changes sign, and the beam is now a cantilever beyond the cable with large bending at the cable point.`,
    insight: R`Always ask what the reactions are physically doing. A sign change tells you the connection type matters: a hinge that can only push would fail here.`,
    follow: R`For a fixed cable length, is there an angle $\theta$ that minimises the force in the hinge? What limits how small you can make $\theta$ in practice?`
  });

  Q({ id: 'st-blocks', topic: 'statics', diff: 4, mins: 10,
    title: 'Leaning tower of blocks',
    q: R`You have $n$ identical rectangular blocks of length $L$. Stack them one on top of another at the edge of a table so that the top block sticks out as far as possible beyond the edge. How far can it overhang? Is there a limit as $n \to \infty$?`,
    hints: [
      R`Work from the top down. The top block can overhang the one below by $L/2$.`,
      R`For the top $k$ blocks treated as one, their combined centre of mass must lie over the edge of block $k+1$.`,
      R`The offsets go $\tfrac{L}{2}, \tfrac{L}{4}, \tfrac{L}{6}, \dots$`
    ],
    sol: R`Put the top $k$ blocks' combined centre of mass exactly over the edge of block $k+1$. Adding block $k+1$ underneath, shifted so the combined centre of mass of $k+1$ blocks sits on the next edge: that block contributes its weight at offset $L/2$ from its edge, so the shift is
$$d_{k+1} = \frac{1\cdot\tfrac{L}{2}}{k+1} = \frac{L}{2(k+1)}.$$
Total overhang:
$$D_n = \frac{L}{2}\sum_{k=1}^{n}\frac1k.$$
The harmonic series diverges, so <b>there is no limit</b>. With 4 blocks the overhang already exceeds one block length ($\tfrac{25}{24}L$), but you need about $e^{2D/L}$ blocks for overhang $D$, so it grows only logarithmically.`,
    insight: R`Build the problem recursively from the simplest end. Spotting $\sum 1/k$ and knowing it diverges (compare with $\int dx/x = \ln x$) is the key step.`,
    follow: R`If blocks may also be placed side by side as counterweights (not one per level), you can do better, growing like $n^{1/3}$. Why does adding counterweights beat the single-column stack so dramatically?`
  });

  Q({ id: 'st-capstan', topic: 'statics', diff: 4, mins: 10,
    title: 'Rope around a bollard',
    q: R`A sailor holds a ship against a pull of $10\,000$ N by wrapping a rope around a cylindrical bollard and pulling on the free end with just $200$ N. The coefficient of friction is $0.3$. Derive how the tension varies around the bollard and find how many turns are needed.`,
    hints: [
      R`Consider a small element of rope subtending angle $d\theta$. The tensions at its ends are $T$ and $T + dT$.`,
      R`The normal force on the element is approximately $T\,d\theta$, because the two tensions are slightly inclined to each other.`,
      R`Friction on the element is at most $\mu T\,d\theta$, which balances $dT$.`
    ],
    sol: R`For an element of angle $d\theta$: the inward normal force is $N = T\,d\theta$ (resolving the two nearly antiparallel tensions). Limiting friction balances the tension difference:
$$dT = \mu T\,d\theta \;\Rightarrow\; \frac{dT}{T} = \mu\,d\theta \;\Rightarrow\; T_2 = T_1 e^{\mu\theta}.$$
This is the capstan equation. We need $e^{0.3\theta} = 50$, so $\theta = \ln 50/0.3 \approx 13.0$ rad $\approx$ <b>2.1 turns</b>. Three turns give a ratio of $e^{0.3\cdot 6\pi} \approx 286$.`,
    insight: R`Exponential growth comes from "the change is proportional to the current value". Here more tension means more normal force, which means more friction. The bollard's radius doesn't appear at all.`,
    follow: R`Why does the radius not matter? Where else in engineering do you see this effect? (Belt drives and band brakes. Also, why does a wet rope slip?)`
  });

  Q({ id: 'st-washing-line', topic: 'statics', diff: 3, mins: 6,
    title: 'Can you pull a line perfectly straight?',
    q: R`A light rope is stretched between two posts $2\ell$ apart and a mass $m$ is hung at the midpoint, which sags by $d$. Find the tension. Can you ever pull the rope hard enough to make it perfectly straight? Estimate the tension needed for a 1 kg mass on a 4 m line sagging by 1 cm.`,
    hints: [
      R`Each half of the rope makes a small angle $\alpha$ with the horizontal, where $\tan\alpha = d/\ell$.`,
      R`Resolve vertically at the mass.`
    ],
    sol: R`Vertically: $2T\sin\alpha = mg$, so $T = \dfrac{mg}{2\sin\alpha} \approx \dfrac{mg\,\ell}{2d}$ for small sag.

As $d \to 0$, $T \to \infty$, so no finite tension makes the rope perfectly straight. For $m = 1$ kg, $\ell = 2$ m, $d = 0.01$ m: $T \approx \dfrac{9.8\times 2}{0.02} \approx 980$ N, about the weight of a 100 kg person, just to hold 1 kg.`,
    insight: R`A tension member can only carry a transverse load by changing direction. The flatter the angle, the larger the force. This is why power lines sag and why shallow trusses carry huge member forces.`,
    follow: R`Real ropes stretch. If the rope has stiffness $k$ and is initially taut and straight, show that the sag grows as $d \propto (mg/k)^{1/3}$ for small loads.`
  });

  Q({ id: 'st-topple', topic: 'statics', diff: 3, mins: 7,
    title: 'Slide or topple?',
    q: R`A uniform rectangular block of height $h$ and base width $b$ sits on a rough plank (friction coefficient $\mu$). The plank is slowly tilted. Does the block slide or topple first? Then: the block sits on flat ground and you push it horizontally at height $y$. What decides whether it slides or tips?`,
    hints: [
      R`Sliding starts when $\tan\theta = \mu$.`,
      R`Toppling starts when the weight's line of action passes outside the base, through the lower corner.`,
      R`For the push: compare the push needed to slide ($\mu W$) with the push needed to tip (moments about the front corner).`
    ],
    sol: R`<b>Tilt.</b> It slides when $\tan\theta = \mu$. It topples when the centre of mass is directly above the lower edge: $\tan\theta = b/h$. Whichever angle is smaller happens first: <b>it topples first if $b/h < \mu$</b> (tall, thin block on a grippy surface).

<b>Push.</b> Sliding needs $P = \mu W$. Tipping about the front corner needs $P\,y = W\,b/2$, i.e. $P = \dfrac{Wb}{2y}$. It tips first if $\dfrac{b}{2y} < \mu$, i.e. if you push above height $y = \dfrac{b}{2\mu}$.`,
    insight: R`Compare two failure modes by finding the threshold for each separately. Moments about the pivot corner remove the reaction forces.`,
    follow: R`Why do lorries on a banked corner sometimes tip over rather than skid? What design choices control that?`
  });

  Q({ id: 'st-dam', topic: 'statics', diff: 4, mins: 12,
    title: 'Gravity dam thickness',
    q: R`A concrete gravity dam with a rectangular cross-section holds back water to its full height $H$. Concrete is about 2.4 times denser than water. How thick must the dam be so it is not overturned? Then check sliding, taking a friction coefficient of 0.6. Why are real dams triangular?`,
    hints: [
      R`Water pressure increases linearly with depth: $p = \rho g z$. Find the total horizontal force per unit width and where it acts.`,
      R`The resultant of a triangular pressure distribution acts at $H/3$ above the base.`,
      R`Take moments about the downstream toe.`
    ],
    sol: R`Per unit width, the water force is $F = \int_0^H \rho g z\,dz = \tfrac12\rho g H^2$, acting $H/3$ above the base, so the overturning moment about the toe is $\tfrac16 \rho g H^3$.

The restoring moment of a dam of thickness $t$ is $\rho_c g H t\cdot \tfrac{t}{2}$. No overturning:
$$\tfrac12\rho_c H t^2 \ge \tfrac16 \rho H^3 \;\Rightarrow\; t \ge H\sqrt{\frac{\rho}{3\rho_c}} = H\sqrt{\frac{1}{7.2}} \approx 0.37H.$$

Sliding: $\mu\rho_c g H t \ge \tfrac12 \rho g H^2 \Rightarrow t \ge \dfrac{H}{2\times 0.6 \times 2.4} \approx 0.35H$. Both are similar, so take $t \approx 0.4H$ plus a safety factor.

Real dams are triangular because the water load is zero at the top and greatest at the bottom. Material near the top does little. A triangle puts weight where it's needed and lowers the centre of the resultant force. Seepage under the dam also causes <b>uplift pressure</b>, which reduces the effective weight. Designers add drains and cut-offs to deal with it.`,
    insight: R`Integrate distributed loads to find both the resultant and where it acts. Then always check more than one failure mode (overturning, sliding, crushing).`,
    follow: R`An arch dam in a narrow gorge can be far thinner. Why? Where does the load go instead?`
  });

  Q({ id: 'st-rod-bowl', topic: 'statics', diff: 5, mins: 14,
    title: 'Rod in a hemispherical bowl',
    q: R`A uniform rod of length $2\ell$ rests in equilibrium inside a smooth fixed hemispherical bowl of radius $r$, with one end on the inner surface and the rod resting on the rim. Find the angle $\theta$ the rod makes with the horizontal.`,
    hints: [
      R`At the end inside the bowl, the smooth reaction points to the centre. At the rim, it is perpendicular to the rod.`,
      R`Either use three-force concurrency or (easier) minimise potential energy: find the height of the rod's centre as a function of $\theta$.`,
      R`The chord from the inner end to the rim has length $2r\cos\theta$ (isosceles triangle with the centre).`
    ],
    sol: R`Let the rim contact be $B$ and the inner end $A$. Triangle $OAB$ is isosceles ($OA = OB = r$) and $OB$ is horizontal, so the angle at $B$ is $\theta$, the angle at $A$ is $\theta$, and $AB = 2r\cos\theta$.

The centre $G$ is a distance $\ell$ from $A$ along the rod, i.e. $2r\cos\theta - \ell$ below $B$ along the rod. Its height relative to the rim is
$$y_G = -(2r\cos\theta - \ell)\sin\theta.$$
Equilibrium means $dV/d\theta = 0$:
$$\ell\cos\theta - 2r(\cos^2\theta - \sin^2\theta) = 0 \;\Rightarrow\; \ell\cos\theta = 2r\cos 2\theta.$$
So $4r\cos^2\theta - \ell\cos\theta - 2r = 0$, giving
$$\cos\theta = \frac{\ell + \sqrt{\ell^2 + 32r^2}}{8r}.$$
This needs $2r\cos\theta > \ell$ so that $G$ lies between the two contact points.`,
    insight: R`For smooth systems with one degree of freedom, energy minimisation is often far cleaner than forces. Geometry (spotting the isosceles triangle) does most of the work.`,
    follow: R`Is the equilibrium stable? What happens to the solution as $\ell \to 0$? Check: $\cos\theta \to 1/\sqrt2$, i.e. $45^\circ$. Does that make physical sense?`
  });

  Q({ id: 'st-plank-orientation', topic: 'statics', diff: 3, mins: 7,
    title: 'Plank on edge or flat?',
    q: R`You need to bridge a stream with a wooden plank 200 mm wide and 25 mm thick. Should you lay it flat or on its edge? By what factors do stiffness and strength change? Why might "on edge" still fail?`,
    hints: [
      R`Bending stiffness depends on the second moment of area, $I = bd^3/12$, where $d$ is the depth in the direction of bending.`,
      R`Strength (maximum moment before yield) depends on $I/(d/2) = bd^2/6$.`
    ],
    sol: R`Flat: $b = 200$, $d = 25$. On edge: $b = 25$, $d = 200$.

Stiffness ratio: $\dfrac{I_\text{edge}}{I_\text{flat}} = \dfrac{25\cdot 200^3}{200\cdot 25^3} = (200/25)^2 = 64$.

Strength ratio: $\dfrac{25\cdot 200^2}{200\cdot 25^2} = 8$.

So on edge it is 64 times stiffer and 8 times stronger. But a tall thin plank on edge is unstable sideways. Under load it can twist and buckle out of plane (lateral-torsional buckling), and it will simply roll over when you step on it. In practice you'd need to brace it, or use an I- or box section, which puts material far from the neutral axis while staying laterally stable.`,
    insight: R`Material far from the neutral axis does the work in bending ($I \propto d^3$). But a slender cross-section brings a new failure mode: buckling. Mention both.`,
    follow: R`Why do I-beams have flanges at all? Why not just a very deep thin web?`
  });

  Q({ id: 'st-suspension', topic: 'statics', diff: 5, mins: 14,
    title: 'Shape of a suspension bridge cable',
    q: R`A suspension bridge deck of span $L$ weighs $w$ per unit horizontal length and hangs from a light cable that sags by $d$ at mid-span. Show that the cable is a parabola, and find the tension at the towers. How does it compare to a hanging chain?`,
    hints: [
      R`Consider a piece of cable from the lowest point to a point at horizontal distance $x$. The horizontal tension component $H$ is the same everywhere. Why?`,
      R`The vertical component of tension at $x$ supports the deck weight $wx$.`,
      R`So $\tan\phi = dy/dx = wx/H$.`
    ],
    sol: R`With no horizontal loads, the horizontal tension component $H$ is constant. For the segment from the lowest point to $x$, the vertical component is $V = wx$, so
$$\frac{dy}{dx} = \frac{wx}{H} \;\Rightarrow\; y = \frac{w x^2}{2H},$$
a <b>parabola</b>. At the tower ($x = L/2$, $y = d$): $H = \dfrac{wL^2}{8d}$. Tower tension:
$$T = \sqrt{H^2 + \left(\tfrac{wL}{2}\right)^2} = \frac{wL}{2}\sqrt{1 + \frac{L^2}{16d^2}}.$$

A free chain carries its weight per unit <b>arc length</b>, not per horizontal length. That gives $H\,y'' = w\sqrt{1+y'^2}$, whose solution is the <b>catenary</b> $y = a\cosh(x/a)$. For shallow sags the two look almost the same.`,
    insight: R`Choose a free body cleverly (from the lowest point, where the tension is horizontal). Constant horizontal tension follows straight from horizontal equilibrium.`,
    follow: R`Typical sag-to-span ratios are around 1:10. What happens to cable force and tower height as you make the cable flatter? Inverted, the same shape gives an arch in pure compression. Why is that useful for masonry?`
  });

  Q({ id: 'st-sledge', topic: 'statics', diff: 3, mins: 6,
    title: 'Best angle to pull a sledge',
    q: R`You drag a sledge of weight $W$ at constant speed across snow with friction coefficient $\mu$, using a rope at angle $\alpha$ above the horizontal. What angle minimises the pull? What is the minimum force?`,
    hints: [
      R`Pulling upwards reduces the normal reaction, and so the friction.`,
      R`Write $P(\alpha)$ and minimise the denominator $\cos\alpha + \mu\sin\alpha$.`
    ],
    sol: R`Normal: $N = W - P\sin\alpha$. Horizontal: $P\cos\alpha = \mu N$. So
$$P = \frac{\mu W}{\cos\alpha + \mu\sin\alpha}.$$
The denominator is maximised when $-\sin\alpha + \mu\cos\alpha = 0$, i.e. $\tan\alpha = \mu$. Then $\cos\alpha + \mu\sin\alpha = \sqrt{1+\mu^2}$, so
$$P_\text{min} = \frac{\mu W}{\sqrt{1+\mu^2}}.$$
Geometrically, this is when the rope is perpendicular to the total reaction from the ground (normal plus friction), which is inclined at the friction angle $\lambda = \arctan\mu$.`,
    insight: R`Combine normal reaction and friction into one "total reaction" at angle $\lambda$. Many friction problems become simple geometry.`,
    follow: R`Is it easier to push or pull a lawnmower, and why?`
  });

  Q({ id: 'st-hemisphere', topic: 'statics', diff: 4, mins: 10,
    title: 'Centre of mass of a hemisphere',
    q: R`Find the centre of mass of a solid hemisphere of radius $r$ by integration. The hemisphere then rests with its curved surface on a rough inclined plane. What is the steepest incline on which it can stay in equilibrium?`,
    hints: [
      R`Slice into discs parallel to the flat face: radius $\sqrt{r^2 - z^2}$, thickness $dz$.`,
      R`$\bar z = \dfrac{\int z\,dV}{\int dV}$.`,
      R`On the slope, the contact point is directly below the centre of the flat face (normal to the sphere). Equilibrium needs $G$ vertically above the contact point.`
    ],
    sol: R`$$\bar z = \frac{\int_0^r z\,\pi(r^2-z^2)\,dz}{\tfrac23\pi r^3} = \frac{\pi\left(\tfrac{r^4}{2} - \tfrac{r^4}{4}\right)}{\tfrac23\pi r^3} = \frac{3r}{8}.$$

On the incline at angle $\alpha$, the contact point $C$ lies on the line through the sphere's centre $O$ perpendicular to the plane. If the hemisphere tilts by $\phi$, then $G$ (a distance $3r/8$ from $O$) must be vertically above $C$. The horizontal offset of $C$ from $O$ is $r\sin\alpha$, and the most $G$ can offset is $\tfrac{3r}{8}$ (when its axis is horizontal), so we need
$$r\sin\alpha \le \tfrac38 r \;\Rightarrow\; \sin\alpha \le \tfrac38,\quad \alpha \le 22^\circ,$$
assuming friction is sufficient ($\mu \ge \tan\alpha$).`,
    insight: R`Learn the standard results (hemisphere $3r/8$, cone $h/4$, semicircular lamina $4r/3\pi$), but be able to derive them in under two minutes.`,
    follow: R`For a hollow hemispherical shell, the centre of mass is at $r/2$. Derive it using the "hat-box" fact that equal-width slices of a sphere's surface have equal area.`
  });

  /* ───────────── DYNAMICS & ENERGY ───────────── */

  Q({ id: 'dy-falling-rod', topic: 'dynamics', diff: 4, mins: 10,
    title: 'Falling rod: faster than gravity',
    q: R`A uniform rod of length $L$ is pivoted at one end and released from rest horizontally.

(a) What is its angular velocity when vertical?

(b) What is the force on the pivot at that moment?

(c) A coin rests on the far end at release. Does it stay in contact?`,
    hints: [
      R`$I_\text{end} = \tfrac13 mL^2$. Use energy for (a).`,
      R`At the bottom, the centre of mass moves in a circle: the net upward force is $m\omega^2 L/2$.`,
      R`For (c), find the initial angular acceleration and the resulting acceleration of the free end.`
    ],
    sol: R`<b>(a)</b> The centre of mass falls $L/2$: $\;mg\tfrac L2 = \tfrac12\cdot\tfrac13 mL^2\omega^2 \Rightarrow \omega = \sqrt{3g/L}$.

<b>(b)</b> At the bottom, $R - mg = m\omega^2\tfrac{L}{2} = \tfrac32 mg$, so $R = \tfrac52 mg$.

<b>(c)</b> At release, torque $mg\tfrac L2 = \tfrac13 mL^2\alpha \Rightarrow \alpha = \tfrac{3g}{2L}$. The far end accelerates downward at $\alpha L = \tfrac32 g > g$. The coin falls freely at $g$, so it is <b>left behind</b>. In fact every point beyond $\tfrac23 L$ accelerates faster than $g$.`,
    insight: R`A rigid body can accelerate parts of itself faster than free fall because internal forces pull the tip down. Check numbers too: $L = 1$ m gives $\omega \approx 5.4$ rad/s.`,
    follow: R`This is why a falling chimney often snaps partway up. Where would you expect it to break, and which way does the break bend?`
  });

  Q({ id: 'dy-skydiver', topic: 'dynamics', diff: 4, mins: 12,
    title: 'The skydiver',
    q: R`Sketch and explain a skydiver's velocity–time graph from leaving the plane until after landing. Then model it: with quadratic drag $F = kv^2$, find the terminal velocity and solve for $v(t)$. Estimate the terminal speed of a person.`,
    hints: [
      R`$m\dot v = mg - kv^2$. Terminal velocity: $\dot v = 0$.`,
      R`Write $v_t^2 = mg/k$ and separate variables using partial fractions, or recognise the standard integral of $1/(1-u^2)$.`,
      R`For the estimate, $k = \tfrac12\rho C_D A$ with $C_D \approx 1$ and $A \approx 0.7\ \text{m}^2$ spread-eagled.`
    ],
    sol: R`<b>Shape:</b> starts with slope $g$, curves over to terminal velocity $v_t$. When the chute opens, drag suddenly exceeds weight, giving a sharp deceleration (negative slope, steep at first) down to a new, much lower terminal speed. Landing ends in a near-instant drop to zero.

<b>Model:</b> $\dot v = g\left(1 - \dfrac{v^2}{v_t^2}\right)$ with $v_t = \sqrt{mg/k}$. Separating:
$$\int\frac{dv}{1 - v^2/v_t^2} = g t \;\Rightarrow\; v = v_t\tanh\!\left(\frac{g t}{v_t}\right).$$

<b>Estimate:</b> $v_t = \sqrt{\dfrac{2mg}{\rho C_D A}} = \sqrt{\dfrac{2\cdot 80\cdot 9.8}{1.2\cdot 1\cdot 0.7}} \approx 43$ m/s (~150 km/h). The real value is about 55 m/s. Head-down it's faster (~80 m/s). With a 50 m² parachute, $v_t \approx 5$ m/s.`,
    insight: R`Interviewers love "sketch it, then model it, then estimate it". Talk through limiting cases: small $t$ ($v\approx gt$) and large $t$ ($v\to v_t$).`,
    follow: R`Why is drag $\propto v^2$ here rather than $\propto v$? (Reynolds number.) What would change if you jumped from 39 km, as Baumgartner did?`
  });

  Q({ id: 'dy-rain', topic: 'dynamics', diff: 4, mins: 10,
    title: 'Run or walk in the rain?',
    q: R`To stay as dry as possible over a fixed distance $D$, should you run or walk? Model yourself as a box with top area $A_t$ and front area $A_f$, with rain falling vertically at speed $u$. Then add a tailwind that gives the rain horizontal velocity $w$ in your direction of travel.`,
    hints: [
      R`Split the wetting into rain hitting your top and rain hitting your front.`,
      R`Top: rate $\propto u A_t$, for a time $D/v$. Front: you sweep through a volume $A_f D$ of rain-filled air whatever your speed.`,
      R`With wind, work in the air's frame: your relative horizontal speed is $|v - w|$.`
    ],
    sol: R`With rain density $\rho$ (water per volume of air):
$$\text{Wetness} = \rho\left(\frac{u A_t D}{v} + A_f D\right).$$
The front term doesn't depend on speed, and the top term falls as $1/v$, so <b>run as fast as possible</b>.

With a tailwind $w$, for $v > w$: front wetness is $\rho A_f D\,\dfrac{v-w}{v}$, so
$$\text{Wetness} = \frac{\rho D}{v}\left(uA_t - wA_f\right) + \rho A_f D.$$
If $uA_t > wA_f$, still run flat out. If the tailwind is strong ($wA_f > uA_t$), the best is to <b>move with the wind</b>, $v = w$, so your front stays dry. For $v < w$, rain hits your back and you get wetter.`,
    insight: R`Pick a smart reference frame and separate contributions. Interviewers want to see you state assumptions (a box, steady rain) and then question them.`,
    follow: R`How does leaning forward change things? Is it worth it in practice? (Estimate the difference between walking at 1.5 m/s and running at 5 m/s for 100 m.)`
  });

  Q({ id: 'dy-bounce', topic: 'dynamics', diff: 4, mins: 10,
    title: 'Infinite bounces in finite time',
    q: R`A ball is dropped from height $h$ onto a floor with coefficient of restitution $e$. It bounces infinitely many times. Show that it stops in a finite time and find that time and the total distance travelled.`,
    hints: [
      R`Each bounce multiplies the speed by $e$, and so the flight time by $e$.`,
      R`Fall time $t_0 = \sqrt{2h/g}$. Each bounce's flight lasts $2t_0 e^n$.`,
      R`Sum the geometric series.`
    ],
    sol: R`Time to first impact $t_0 = \sqrt{2h/g}$. After the $n$th bounce the speed is $e^n v_0$ and the flight time is $2e^n t_0$:
$$T = t_0 + 2t_0(e + e^2 + \dots) = t_0\left(1 + \frac{2e}{1-e}\right) = \sqrt{\frac{2h}{g}}\;\frac{1+e}{1-e}.$$
Heights scale by $e^2$:
$$S = h + 2h(e^2 + e^4 + \dots) = h\,\frac{1+e^2}{1-e^2}.$$
For $e = 0.8$, $h = 1$ m: $T \approx 4.1$ s and $S \approx 4.6$ m.`,
    insight: R`Infinitely many events can fit in finite time when they shrink geometrically (Zeno). In reality, $e$ isn't constant at low speeds and the ball ends up resting with small vibrations.`,
    follow: R`If you could measure only $T$ and $h$, how would you find $e$? Is that a good experimental method?`
  });

  Q({ id: 'dy-guns', topic: 'dynamics', diff: 3, mins: 7,
    title: 'Two guns',
    q: R`(Reported by a Downing College Engineering applicant.) I have two guns, identical except that one has a longer barrel. Which one shoots further, and why? Is there a limit?`,
    hints: [
      R`The bullet is pushed by gas pressure while it's in the barrel. Think in terms of work done.`,
      R`Does the pressure stay constant as the bullet moves down the barrel?`
    ],
    sol: R`The gas does work $W = \int p A\,dx$ on the bullet while it's in the barrel. A longer barrel means more distance under pressure, so more kinetic energy, a higher muzzle velocity, and a longer range ($\propto v^2$ ignoring drag). At constant pressure, $v \propto \sqrt{L}$.

But the gas expands roughly adiabatically ($pV^\gamma = $ const), so the pressure falls as the bullet travels: the work grows ever more slowly ($\int dx/x^\gamma$ converges). Meanwhile friction against the barrel keeps acting. Beyond some length, friction exceeds the dwindling pressure force and the bullet <b>slows down</b>. There's an optimum barrel length, and in practice handling, weight and recoil matter too.

Range also depends on drag. At high speed, air drag takes a large share, so range grows less than $v^2$.`,
    insight: R`Start simple (constant force, work–energy), then improve the model one effect at a time: gas expansion, friction, drag. Saying "it depends, and here's on what" is the engineering answer.`,
    follow: R`Why do artillery guns have such long barrels while pistols have short ones? (Different design goals.)`
  });

  Q({ id: 'dy-rocket', topic: 'dynamics', diff: 4, mins: 10,
    title: 'Rocket equation',
    q: R`A rocket in deep space ejects exhaust at speed $u$ relative to itself. Derive the change in velocity when its mass falls from $m_0$ to $m_1$. Why are rockets built in stages? Estimate the fuel fraction needed to reach low Earth orbit ($\Delta v \approx 9.5$ km/s with losses) with $u = 3.5$ km/s.`,
    hints: [
      R`In time $dt$ the rocket loses mass $|dm|$, ejected backwards at speed $u$ relative to it. Conserve momentum.`,
      R`$m\,dv = -u\,dm$.`
    ],
    sol: R`Momentum: before, $mv$. After: $(m + dm)(v + dv) + (-dm)(v - u)$, with $dm < 0$. To first order, $m\,dv = -u\,dm$, so
$$\Delta v = u\ln\frac{m_0}{m_1}.$$
For $\Delta v = 9.5$ km/s and $u = 3.5$ km/s: $m_0/m_1 = e^{2.71} \approx 15$, so about <b>93% of the launch mass is propellant</b>.

Staging: in a single stage you have to keep accelerating empty tanks and big engines. Dropping dead mass partway raises the effective mass ratio, so the same propellant gives much more $\Delta v$.`,
    insight: R`Logarithmic payoff: doubling $\Delta v$ squares the mass ratio. That's the "tyranny of the rocket equation" and why exhaust velocity matters so much.`,
    follow: R`Why can't a rocket simply carry "more fuel" to go faster? Show that the payload fraction falls exponentially with required $\Delta v$.`
  });

  Q({ id: 'dy-billiards', topic: 'dynamics', diff: 3, mins: 6,
    title: 'Billiard balls at right angles',
    q: R`A moving billiard ball strikes an identical stationary ball off-centre. The collision is perfectly elastic and you can ignore spin. Prove the two balls move off at right angles.`,
    hints: [
      R`Write momentum as a vector equation: $\mathbf v = \mathbf v_1 + \mathbf v_2$.`,
      R`Energy gives $v^2 = v_1^2 + v_2^2$. Square the momentum equation.`
    ],
    sol: R`Momentum (equal masses): $\mathbf v = \mathbf v_1 + \mathbf v_2$. Squaring: $v^2 = v_1^2 + v_2^2 + 2\,\mathbf v_1\cdot\mathbf v_2$.

Energy: $v^2 = v_1^2 + v_2^2$. Hence $\mathbf v_1\cdot\mathbf v_2 = 0$, so they move at <b>90°</b> (unless the hit is head-on, when one ball stops).`,
    insight: R`Vector momentum and scalar energy together form a Pythagorean triangle. Recognising this saves pages of trigonometry.`,
    follow: R`In real snooker, the angle is a bit less than 90°. Why? (Rolling and spin, and $e < 1$.) Professionals deliberately use spin to change it.`
  });

  Q({ id: 'dy-stacked-balls', topic: 'dynamics', diff: 4, mins: 9,
    title: 'Basketball and tennis ball',
    q: R`A tennis ball sits on top of a basketball and both are dropped together from height $h$. The basketball is much heavier and all collisions are elastic. How high does the tennis ball rebound? What about three balls stacked, each much lighter than the one below?`,
    hints: [
      R`Just before impact both move down at $v = \sqrt{2gh}$. The basketball bounces off the floor first and is moving up at $v$.`,
      R`Look at the tennis ball's collision in the basketball's frame.`
    ],
    sol: R`The basketball rebounds at $v$ upwards and meets the tennis ball, which is still coming down at $v$. In the basketball's frame, the tennis ball approaches at $2v$ and bounces off the (effectively infinite) mass at $2v$. Back in the ground frame it moves at $2v + v = 3v$ upwards.

Height $\propto v^2$, so it rises to <b>$9h$</b>.

With three balls: the second ball leaves at $3v$, the third meets it at $v$ downward, so the relative speed is $4v$ and it leaves at $4v + 3v = 7v$, reaching $49h$. In general the speeds go $1, 3, 7, 15, \dots = 2^n - 1$.`,
    insight: R`Change to the frame where the collision is easy (a heavy wall), then transform back. Energy is transferred from the heavy ball to the light one.`,
    follow: R`Check energy conservation: does the basketball still bounce to $h$? (No. It gives energy to the tennis ball.) What's the real-life limit? (Ball compression and finite mass ratios.)`
  });

  Q({ id: 'dy-tunnel', topic: 'dynamics', diff: 5, mins: 12,
    title: 'Jump down a hole through the Earth',
    q: R`(A well-known Oxbridge curveball.) A straight tunnel is drilled through the centre of the Earth, with no air and a uniform-density Earth. You jump in. Describe your motion and find how long it takes to reach the other side. Then show that a straight frictionless tunnel between <i>any</i> two points on the surface takes the same time.`,
    hints: [
      R`Inside a uniform sphere, only the mass inside radius $r$ attracts you (shell theorem). It scales as $r^3$.`,
      R`So $g(r) = g\,r/R$: a restoring force proportional to displacement.`,
      R`For a chord, resolve the gravitational force along the tunnel. The component along it is proportional to the distance from the chord's midpoint.`
    ],
    sol: R`Inside: $F = -\dfrac{GM(r)m}{r^2} = -\dfrac{mg}{R}r$, which is simple harmonic motion with $\omega = \sqrt{g/R}$.

Time to the other side is half a period: $t = \pi\sqrt{R/g} = \pi\sqrt{6.4\times10^6/9.8} \approx 2540$ s $\approx$ <b>42 minutes</b>. You pass the centre at $v_\text{max} = \sqrt{gR} \approx 7.9$ km/s, the low-orbit speed.

Chord: if $x$ is the distance along the tunnel from its midpoint, the component of $-\tfrac{mg}{R}\mathbf r$ along the tunnel is $-\tfrac{mg}{R}x$. That's the same SHM with the same $\omega$, so it takes <b>42 minutes for any chord</b>. The period also equals that of a satellite skimming the surface: SHM is the projection of circular motion.`,
    insight: R`Linear restoring force means SHM. Recognising that, plus the shell theorem, turns a scary question into a two-line one. Always quote the number.`,
    follow: R`In the real Earth the core is much denser. Does the trip take longer or shorter? (Shorter, about 38 minutes, because gravity stays nearly constant through the mantle.)`
  });

  Q({ id: 'dy-cliff-range', topic: 'dynamics', diff: 5, mins: 14,
    title: 'Maximum range from a cliff',
    q: R`You throw a stone at speed $u$ from the top of a cliff of height $h$. What launch angle gives the maximum horizontal range, and what is that range? Check your answer against the $h = 0$ case.`,
    hints: [
      R`Energy gives the landing speed: $v^2 = u^2 + 2gh$, independent of angle.`,
      R`A neat result: at maximum range, the launch and landing velocities are perpendicular.`,
      R`The range equals $\tfrac{1}{g}|\mathbf u \times \mathbf v|$ (horizontal momentum per mass times time). Maximise using $\sin = 1$.`
    ],
    sol: R`Horizontal velocity is $u\cos\theta$ throughout. Since $\mathbf v - \mathbf u = \mathbf g\,t$, the cross product gives $|\mathbf u\times\mathbf v| = |\mathbf u\times\mathbf g|\,t = u g\cos\theta\,t = gR$. So
$$R = \frac{u v\sin\phi}{g},$$
where $\phi$ is the angle between $\mathbf u$ and $\mathbf v$. With $u$ and $v = \sqrt{u^2+2gh}$ fixed, $R$ is greatest when $\phi = 90^\circ$:
$$R_\text{max} = \frac{u\sqrt{u^2 + 2gh}}{g}, \qquad \tan\theta = \frac{u}{\sqrt{u^2+2gh}}.$$
Check $h = 0$: $\tan\theta = 1$, so $45^\circ$ and $R = u^2/g$. ✓ From a cliff the optimum angle is below $45^\circ$.`,
    insight: R`The brute-force route (quadratic in $t$, then differentiate) works but is messy. Spotting an invariant ($v$ is fixed by energy) gives an elegant answer. Mention both routes.`,
    follow: R`Why is the shot-put optimum angle less than 45° even from ground level? (Release height, and the human body can throw faster at lower angles.)`
  });

  Q({ id: 'dy-banked', topic: 'dynamics', diff: 3, mins: 8,
    title: 'Banked track',
    q: R`A car goes round a circular track of radius $r$ banked at angle $\theta$. (a) At what speed is no friction needed? (b) With friction coefficient $\mu$, what's the maximum speed before it slides up the bank?`,
    hints: [
      R`Resolve horizontally (towards the centre: $mv^2/r$) and vertically (zero net force).`,
      R`At maximum speed, friction acts down the slope with magnitude $\mu N$.`
    ],
    sol: R`<b>(a)</b> $N\sin\theta = mv^2/r$ and $N\cos\theta = mg$, so $v^2 = rg\tan\theta$.

<b>(b)</b> With friction $\mu N$ down the slope:
$$N(\sin\theta + \mu\cos\theta) = \frac{mv^2}{r},\quad N(\cos\theta - \mu\sin\theta) = mg,$$
$$v_\text{max}^2 = rg\,\frac{\sin\theta + \mu\cos\theta}{\cos\theta - \mu\sin\theta} = rg\tan(\theta + \lambda),\ \ \tan\lambda = \mu.$$
If $\theta + \lambda \ge 90^\circ$ there's no upper limit: the car is pressed harder into the track the faster it goes.`,
    insight: R`Resolve along the directions you know the acceleration in (horizontal and vertical), not along the slope. Writing it as $\tan(\theta + \lambda)$ shows a deep understanding.`,
    follow: R`Velodromes are banked at up to 45°. What's the minimum speed before a cyclist slides down?`
  });

  Q({ id: 'dy-balloon-car', topic: 'dynamics', diff: 3, mins: 6,
    title: 'Helium balloon in a turning car',
    q: R`You're in a closed car moving at constant speed, holding a helium balloon on a string. The car turns sharply left. Which way do you lurch, and which way does the balloon move? What happens when the car brakes?`,
    hints: [
      R`In the car's frame, there's an extra "fictitious" gravity pointing outward (right).`,
      R`A helium balloon moves opposite to effective gravity, because the air is denser on the "downhill" side.`
    ],
    sol: R`You lurch <b>right</b> (outward). Your body tends to continue in a straight line while the car turns under you.

The balloon moves <b>left</b>, into the turn. The air in the car is also pushed outward, so a pressure gradient builds with higher pressure on the right. The buoyancy force points up that gradient, so the balloon moves towards the low-pressure (inside) side. Equivalently, effective gravity $\mathbf g_\text{eff} = \mathbf g - \mathbf a$ tilts outward, and the balloon "floats up" against it.

When braking, you lurch forward and the balloon moves <b>backward</b>.`,
    insight: R`The equivalence principle: acceleration looks exactly like a tilted gravity field. Buoyant things go "up" relative to effective gravity.`,
    follow: R`What does a pendulum hanging from the mirror do in the turn? And a spirit level on the dashboard?`
  });

  Q({ id: 'dy-monkey', topic: 'dynamics', diff: 3, mins: 6,
    title: 'Monkey and hunter',
    q: R`A hunter aims a dart directly at a monkey hanging from a branch. At the instant the dart is fired, the monkey lets go. Show that the dart hits the monkey, whatever its speed (provided it reaches the monkey's horizontal position before both hit the ground).`,
    hints: [
      R`Work in a frame that is freely falling with acceleration $g$.`,
      R`Or: compare the drop $\tfrac12 g t^2$ of each from where it would have been without gravity.`
    ],
    sol: R`Without gravity the dart travels in a straight line to the monkey's starting position, and the monkey stays put: they meet. Gravity adds the same displacement $-\tfrac12 g t^2$ to both. So at the time the dart reaches the monkey's horizontal position, both have dropped equally and they still meet. In the freely falling frame there's no gravity at all, and the dart goes in a straight line to a stationary monkey.`,
    insight: R`Switch to a freely falling frame to make gravity disappear. The same idea explains weightlessness in orbit.`,
    follow: R`What's the minimum dart speed for the hit to happen before they reach the ground, given distance $d$ and height $H$?`
  });

  Q({ id: 'dy-geostationary', topic: 'dynamics', diff: 3, mins: 7,
    title: 'Geostationary orbit',
    q: R`Derive the radius of a geostationary orbit, using only $g = 9.8$ m/s² and $R_E = 6400$ km (not $G$ or $M$). Roughly how long does a signal take to go up and back? Why must the orbit be above the equator?`,
    hints: [
      R`$GM = gR_E^2$.`,
      R`Gravity provides centripetal force: $GM/r^2 = \omega^2 r$, with $T = 24$ h (strictly, the sidereal day of 23 h 56 min).`
    ],
    sol: R`$\omega^2 r = \dfrac{gR_E^2}{r^2} \Rightarrow r^3 = \dfrac{gR_E^2 T^2}{4\pi^2}$.

With $T = 86\,164$ s: $r^3 \approx \dfrac{9.8\cdot(6.4\times10^6)^2\cdot(8.6\times10^4)^2}{39.5} \approx 7.5\times10^{22}$, so $r \approx 4.2\times 10^7$ m = <b>42 000 km</b> (about 36 000 km above the surface, $\approx 6.6R_E$).

Round trip $\approx 2\times 36\,000/300\,000 \approx 0.24$ s, which is the lag you notice on satellite phone calls.

The orbit's plane must pass through Earth's centre. To stay over one point while the Earth rotates, it has to lie in the equatorial plane.`,
    insight: R`Replace $GM$ with $gR^2$: a trick that comes up again and again. Check the order of magnitude against something you know (the Moon is at $60R_E$ with $T = 27$ days, and $(60/6.6)^{3/2}\approx 27$ ✓).`,
    follow: R`How much energy does it take to put 1 kg into geostationary orbit compared with low orbit?`
  });

  Q({ id: 'dy-escape', topic: 'dynamics', diff: 3, mins: 6,
    title: 'Escape velocity and black holes',
    q: R`Derive the escape velocity from a planet of mass $M$ and radius $R$. Evaluate it for Earth. To what radius would you have to squash the Earth for the escape velocity to equal the speed of light?`,
    hints: [
      R`Kinetic energy must at least equal the depth of the potential well, $GMm/R$.`,
      R`The second part is a "Newtonian black hole", which happens to give the correct Schwarzschild radius.`
    ],
    sol: R`$\tfrac12 m v^2 = \dfrac{GMm}{R} \Rightarrow v_e = \sqrt{2GM/R} = \sqrt{2gR} \approx \sqrt{2\cdot 9.8\cdot 6.4\times10^6} \approx 11.2$ km/s.

Setting $v_e = c$: $R_s = \dfrac{2GM}{c^2} = \dfrac{2gR_E^2}{c^2} = \dfrac{2\cdot 9.8\cdot(6.4\times10^6)^2}{9\times10^{16}} \approx 9$ mm, about the size of a marble.`,
    insight: R`$\sqrt2$ times orbital speed. Note the escape velocity doesn't depend on direction (ignoring the atmosphere). Energy is a scalar.`,
    follow: R`Why do rockets launch eastwards and near the equator? How much does that help?`
  });

  Q({ id: 'dy-drag-coast', topic: 'dynamics', diff: 3, mins: 7,
    title: 'Coasting to a stop',
    q: R`A boat moving at $v_0$ cuts its engine. Model the drag as (a) proportional to $v$, (b) proportional to $v^2$. In each case find $v(t)$ and the total distance travelled before stopping. Which model is more physical, and does the boat ever stop?`,
    hints: [
      R`(a) $\dot v = -kv$. (b) $\dot v = -cv^2$.`,
      R`For distance, either integrate $v(t)$ or use $v\,\dfrac{dv}{dx} = a$.`
    ],
    sol: R`<b>(a)</b> $v = v_0e^{-kt}$. Distance: $\int_0^\infty v\,dt = v_0/k$. It never quite stops but covers a finite distance.

<b>(b)</b> $\dfrac{dv}{v^2} = -c\,dt \Rightarrow v = \dfrac{v_0}{1 + cv_0t}$. Using $v\,dv/dx = -cv^2$: $v = v_0e^{-cx}$, so <b>it travels an infinite distance</b> (logarithmically: $x = \tfrac1c\ln(1+cv_0t)$)!

Physically, drag is $\propto v^2$ at high speeds (turbulent) and $\propto v$ at low speeds (viscous). So the real boat follows (b) at first, then (a), and stops in a finite distance.`,
    insight: R`Pathological results like infinite distance tell you a model has broken down. Interviewers love it when you notice and explain which regime applies.`,
    follow: R`Combine both: $\dot v = -kv - cv^2$. Solve it (it's a Bernoulli equation or partial fractions) and find the stopping distance.`
  });

  /* ───────────── ROTATION & CIRCULAR MOTION ───────────── */

  Q({ id: 'ro-rolling-race', topic: 'rotation', diff: 3, mins: 8,
    title: 'Rolling race',
    q: R`A solid cylinder, a hollow pipe and a solid sphere roll without slipping down the same slope. Which wins? Then: a can of soup and a can of frozen soup race. Which wins and why?`,
    hints: [
      R`Use energy: $mgh = \tfrac12 mv^2 + \tfrac12 I\omega^2$ with $v = \omega r$.`,
      R`Write $I = \beta mr^2$. Then $a = \dfrac{g\sin\theta}{1+\beta}$.`,
      R`Does liquid soup spin with the can?`
    ],
    sol: R`$v^2 = \dfrac{2gh}{1+\beta}$, so the acceleration is $\dfrac{g\sin\theta}{1+\beta}$, independent of mass and radius.

Sphere $\beta = \tfrac25$, cylinder $\tfrac12$, hoop $1$. Order: <b>sphere, solid cylinder, hollow pipe</b>.

Soup: liquid soup barely rotates (low viscosity, short race). Only the thin can rotates, so it behaves like a heavy sliding mass with a light hoop: $\beta$ is small and it <b>wins</b>. Frozen soup rotates as a solid cylinder ($\beta \approx \tfrac12$).`,
    insight: R`The fraction of energy that goes into rotation decides everything. Mass and size cancel out, which is a surprise worth pointing out.`,
    follow: R`What happens over a long race? (Viscosity eventually spins up the liquid soup, and the energy dissipated slows it down.)`
  });

  Q({ id: 'ro-conical', topic: 'rotation', diff: 3, mins: 7,
    title: 'Conical pendulum',
    q: R`A mass on a string of length $L$ whirls in a horizontal circle with the string at angle $\theta$ to the vertical. Find the angular velocity and the period. What happens as you try to spin it slower and slower? Can the string ever be horizontal?`,
    hints: [
      R`Vertically: $T\cos\theta = mg$. Horizontally: $T\sin\theta = m\omega^2 L\sin\theta$.`
    ],
    sol: R`From horizontal: $T = m\omega^2 L$ (if $\sin\theta \ne 0$). Then $\cos\theta = \dfrac{g}{\omega^2 L}$, so $\omega = \sqrt{\dfrac{g}{L\cos\theta}}$ and $\text{period} = 2\pi\sqrt{\dfrac{L\cos\theta}{g}}$.

Since $\cos\theta \le 1$, we need $\omega \ge \sqrt{g/L}$. Slower than that, the only solution is $\theta = 0$, hanging straight down. The circular motion collapses at the simple-pendulum frequency.

Horizontal string: $\cos\theta \to 0$ needs $\omega \to \infty$ and infinite tension, because something must still hold up the weight.`,
    insight: R`Never divide by something that might be zero ($\sin\theta$) without noting the extra solution. That's where the threshold behaviour hides.`,
    follow: R`Watt's centrifugal governor uses exactly this. Explain how it controls a steam engine's speed.`
  });

  Q({ id: 'ro-loop', topic: 'rotation', diff: 4, mins: 10,
    title: 'Loop the loop',
    q: R`A small block slides without friction down a ramp into a vertical circular loop of radius $R$. From what minimum height must it start to get round? How does the answer change for a solid ball rolling without slipping?`,
    hints: [
      R`At the top, contact must just be maintained: $N \ge 0 \Rightarrow v_\text{top}^2 \ge gR$.`,
      R`Energy from the start height $h$ to the top of the loop at height $2R$.`,
      R`For the ball, kinetic energy is $\tfrac12 mv^2(1 + \tfrac25)$. (Ignore the ball's own radius.)`
    ],
    sol: R`At the top: $mg + N = mv^2/R$, and $N \ge 0$ needs $v^2 \ge gR$.

Block: $mg(h - 2R) = \tfrac12 mv^2 \ge \tfrac12 mgR \Rightarrow h \ge \tfrac52 R$.

Ball: $mg(h-2R) = \tfrac{7}{10}mv^2 \ge \tfrac{7}{10}mgR \Rightarrow h \ge 2.7R$.`,
    insight: R`The critical condition is a force condition (contact) at one point, combined with energy to link it to the start. Rotational energy is "wasted" energy that doesn't help it round.`,
    follow: R`Roller-coaster loops are teardrop-shaped (clothoid), not circular. Why? Think about the g-force at the bottom of a circular loop starting from $2.5R$.`
  });

  Q({ id: 'ro-hemisphere-slide', topic: 'rotation', diff: 4, mins: 9,
    title: 'Particle sliding off a dome',
    q: R`A particle starts at rest at the top of a smooth fixed hemisphere of radius $R$ and is given a tiny nudge. At what angle from the vertical does it leave the surface? Where does it land?`,
    hints: [
      R`Energy: $v^2 = 2gR(1-\cos\theta)$.`,
      R`Radial equation: $mg\cos\theta - N = mv^2/R$. It leaves when $N = 0$.`
    ],
    sol: R`$N = mg\cos\theta - \dfrac{mv^2}{R} = mg(3\cos\theta - 2)$. $N = 0$ when $\cos\theta = \tfrac23$, so $\theta \approx 48.2^\circ$ (at a height of $\tfrac23 R$).

At that point $v^2 = \tfrac23 gR$, directed tangentially. It then flies as a projectile from height $\tfrac{2}{3}R$, horizontal position $R\sin\theta = \tfrac{\sqrt5}{3}R$, with velocity components $v\cos\theta$ horizontally and $v\sin\theta$ downwards. Solving the projectile equations, it lands about $1.12R$ from the centre.`,
    insight: R`Leaving the surface = normal force reaching zero. The answer is independent of $g$, $m$ and even $R$ (as an angle), which is a good sanity check.`,
    follow: R`What if the dome is rough and the particle is a rolling ball? (Does it leave earlier or later? Later: $\cos\theta = 10/17$, about $54^\circ$, because some kinetic energy goes into spin.)`
  });

  Q({ id: 'ro-fingers', topic: 'rotation', diff: 3, mins: 6,
    title: 'Ruler on two fingers',
    q: R`Balance a metre rule on two fingers, one near each end, then slowly slide your fingers together. They always meet at the centre, wherever they started. Explain why, carefully.`,
    hints: [
      R`The finger closer to the centre of mass carries more weight, so it has more friction.`,
      R`Static friction is greater than kinetic friction.`
    ],
    sol: R`The normal reactions are inversely proportional to each finger's distance from the centre of mass ($N_1 x_1 = N_2 x_2$). The finger further away carries less load, so it slips first. As it slides inward, its load increases. Once its kinetic friction $\mu_k N$ exceeds the other's limiting static friction $\mu_s N$, the roles swap: it sticks and the other one slides.

The fingers take turns, each slipping when it's the more distant one, so they converge on the centre. Because $\mu_s > \mu_k$, the switch happens with a slight overshoot, which gives the jerky alternating motion.`,
    insight: R`Notice stick–slip behaviour and the role of $\mu_s > \mu_k$. That's the same physics as squeaking doors and violin bows.`,
    follow: R`What happens if you try it starting from the centre and moving the fingers <i>outward</i>?`
  });

  Q({ id: 'ro-spool', topic: 'rotation', diff: 4, mins: 10,
    title: 'Which way does the cotton reel roll?',
    q: R`A cotton reel has an inner axle radius $r$ and outer rim radius $R$, and sits on a rough table. The thread comes off the bottom of the axle, and you pull it at angle $\theta$ to the horizontal. Show that it rolls towards you for small $\theta$ and away for large $\theta$, and find the critical angle.`,
    hints: [
      R`If it rolls without slipping, it rotates instantaneously about the contact point with the table.`,
      R`The direction of rolling is set by the sign of the torque of the pull about the contact point.`,
      R`The critical case is when the line of the thread passes through the contact point.`
    ],
    sol: R`Take torques about the contact point $P$ (friction and normal reaction have no moment about it). The thread leaves the axle at a point whose position depends on $\theta$. The torque of the tension $T$ about $P$ is $T\,(R\cos\theta - r)$ in the sense that rolls it towards you.

So it rolls <b>towards you</b> if $\cos\theta > r/R$, and <b>away</b> if $\cos\theta < r/R$. At $\cos\theta_c = r/R$ the line of the pull passes through $P$, and it just slides without rolling.`,
    insight: R`For rolling, take moments about the contact point. That is the instantaneous centre of rotation. This idea solves many "which way does it go" puzzles.`,
    follow: R`If you pull exactly at the critical angle, what does the reel do as friction is reduced?`
  });

  Q({ id: 'ro-percussion', topic: 'rotation', diff: 4, mins: 10,
    title: 'The sweet spot of a bat',
    q: R`Derive the moment of inertia of a uniform rod of length $L$ about one end. The rod hangs from a frictionless pivot and is struck by a horizontal impulse $J$ at distance $x$ below the pivot. Where should it be struck so that the pivot feels no impulse?`,
    hints: [
      R`$I = \int_0^L \lambda s^2\,ds$.`,
      R`Linear impulse: $J + J_p = m v_G$. Angular impulse about the pivot: $Jx = I\omega$. Set $J_p = 0$.`
    ],
    sol: R`$I_\text{end} = \int_0^L \frac{m}{L}s^2\,ds = \tfrac13 mL^2$.

Angular: $Jx = \tfrac13 mL^2\omega$. Linear, with no pivot impulse: $J = m\omega\tfrac{L}{2}$. Dividing: $x = \dfrac{\tfrac13 L^2}{\tfrac12 L} = \tfrac23 L$.

This is the <b>centre of percussion</b>. Hit there and your hands (the pivot) feel no sting. Doors are best pushed there too.`,
    insight: R`Set up linear and angular impulse equations together. Recognise the general result $x = I_\text{pivot}/(m\,d_G)$, which is also the length of the equivalent simple pendulum.`,
    follow: R`Why does a cricket bat have its sweet spot nearer the bottom? (Mass distribution, and vibration nodes too.)`
  });

  Q({ id: 'ro-skater', topic: 'rotation', diff: 3, mins: 6,
    title: 'Spinning skater',
    q: R`An ice skater spinning with arms out pulls them in, halving their moment of inertia. What happens to their angular velocity and kinetic energy? Where does the extra energy come from?`,
    hints: [
      R`There's no external torque, so angular momentum $I\omega$ is conserved.`,
      R`$KE = \dfrac{L^2}{2I}$.`
    ],
    sol: R`$I\omega$ is constant, so $\omega$ <b>doubles</b>. $KE = L^2/(2I)$, so it also <b>doubles</b>.

The extra energy is work done by the skater's muscles. Pulling the arms inward against the inward force needed for circular motion (in the skater's frame, against the centrifugal force) takes effort. The work done, $\int m\omega^2 r\,dr$, exactly equals the increase in kinetic energy.`,
    insight: R`Conservation of angular momentum doesn't imply conservation of energy. Identify where work is done.`,
    follow: R`How does a cat always land on its feet despite having zero angular momentum?`
  });

  Q({ id: 'ro-clock', topic: 'rotation', diff: 3, mins: 6,
    title: 'Clock hands',
    q: R`At what times between 12:00 and 24:00 do the hour and minute hands of a clock overlap? How many times are they at right angles in 12 hours?`,
    hints: [
      R`The minute hand moves at 360°/h and the hour hand at 30°/h. The relative speed is 330°/h.`,
      R`They overlap each time the minute hand gains a full 360° on the hour hand.`
    ],
    sol: R`They overlap every $\dfrac{360}{330} = \dfrac{12}{11}$ h $\approx$ 1 h 5 min 27.3 s, so at $\tfrac{12k}{11}$ h for $k = 0, 1, \dots, 10$: <b>11 times</b> in 12 hours (e.g. about 1:05:27, 2:10:55, …). 11:00–13:00 has only one overlap, at 12:00.

Right angles happen twice per relative cycle, so <b>22 times</b> in 12 hours.`,
    insight: R`Go to a rotating frame (the hour hand's) and the problem becomes a single hand moving at the relative angular speed.`,
    follow: R`When are the hands exactly opposite? Is there any time when all three hands (including the second hand) coincide apart from 12:00?`
  });

  Q({ id: 'ro-aircraft-turn', topic: 'rotation', diff: 3, mins: 7,
    title: 'Banking aircraft',
    q: R`An aircraft flies a level turn of radius $r$ at speed $v$. Find the bank angle and the "load factor" (apparent weight / true weight) felt by passengers. In a 60° bank, how many g? Why doesn't the drink on your tray spill?`,
    hints: [
      R`Lift acts perpendicular to the wings: $L\cos\phi = mg$, $L\sin\phi = mv^2/r$.`
    ],
    sol: R`$\tan\phi = \dfrac{v^2}{rg}$ and load factor $n = \dfrac{L}{mg} = \dfrac{1}{\cos\phi}$. At 60°, $n = 2$: you feel twice your weight.

In a coordinated turn, effective gravity ($\mathbf g - \mathbf a$) points straight "down" into the cabin floor, perpendicular to the wings. The drink's surface stays parallel to the tray, as in level flight, just heavier.`,
    insight: R`Again the equivalence principle. Inside the plane you can't tell the difference between turning and stronger gravity.`,
    follow: R`Why must the pilot increase speed or power in a steep turn? What is the stall speed in a 60° bank compared with level flight? ($\sqrt2$ times higher.)`
  });

  Q({ id: 'ro-step', topic: 'rotation', diff: 4, mins: 9,
    title: 'Wheel up a kerb',
    q: R`A wheel of radius $R$ and weight $W$ is pushed against a kerb of height $h < R$. What horizontal force applied at the axle will just lift it over? What's the smallest force if you can choose its direction?`,
    hints: [
      R`At the point of lift-off, the ground reaction is zero. Take moments about the kerb edge.`,
      R`The horizontal lever arm of $W$ about the edge is $\sqrt{R^2 - (R-h)^2}$.`
    ],
    sol: R`About the kerb edge: $F(R - h) = W\sqrt{R^2-(R-h)^2} = W\sqrt{h(2R-h)}$, so
$$F = \frac{W\sqrt{h(2R-h)}}{R-h}.$$
As $h \to R$, $F\to\infty$, which is why you can't push a wheel up a step its own radius high.

Minimum force: apply it perpendicular to the line from the kerb edge to the axle (giving the maximum lever arm $R$): $F_\text{min} = \dfrac{W\sqrt{h(2R-h)}}{R}$.`,
    insight: R`Pick the pivot (the kerb edge) to eliminate unknown reactions. For a minimum force, maximise the lever arm, i.e. push perpendicular to the radius to the pivot.`,
    follow: R`Why do off-road vehicles have big wheels? Quantify how the force ratio changes if $R$ doubles for the same kerb.`
  });

  /* ───────────── SPRINGS & OSCILLATIONS ───────────── */

  Q({ id: 'os-bungee', topic: 'oscillations', diff: 4, mins: 12,
    title: 'Bungee jumper',
    q: R`A jumper of mass $m$ uses a bungee rope of natural length $L$ and stiffness $k$. (a) Find the maximum extension. (b) Find the maximum deceleration. (c) The rope's stiffness is $k = EA/L$. Show that, for a given rope material and cross-section, the maximum g-force doesn't depend on $L$.`,
    hints: [
      R`Energy: the total drop is $L + x$, and the elastic energy is $\tfrac12 kx^2$.`,
      R`Max deceleration happens at max extension: $(kx - mg)/m$.`,
      R`Write everything in terms of $\epsilon = x/L$.`
    ],
    sol: R`<b>(a)</b> $mg(L+x) = \tfrac12 kx^2 \Rightarrow x = \dfrac{mg}{k} + \sqrt{\left(\dfrac{mg}{k}\right)^2 + \dfrac{2mgL}{k}}$.

<b>(b)</b> $a_\text{max} = \dfrac{kx}{m} - g$.

<b>(c)</b> With $k = EA/L$ and strain $\epsilon = x/L$: $mg(1+\epsilon) = \tfrac12 EA\epsilon^2$, which doesn't involve $L$. So $\epsilon$ is fixed, and $kx/m = EA\epsilon/m$ is fixed. <b>The peak g-force is independent of jump height</b>; only the extension scales.`,
    insight: R`Non-dimensionalise (strain instead of extension) to find what really matters. This scaling result is a typical "wow" interview moment.`,
    follow: R`After the first bounce, the motion is SHM about the equilibrium point only while the rope is taut. What's the period of that part? Why don't real bungee jumps bounce for ever?`
  });

  Q({ id: 'os-two-masses', topic: 'oscillations', diff: 4, mins: 8,
    title: 'Two masses on a spring',
    q: R`Two masses $m_1$ and $m_2$ are joined by a spring of stiffness $k$ on a frictionless surface. Find the frequency of oscillation. Check the limiting cases. Use this to explain why the vibration frequency of HCl is set mostly by the hydrogen.`,
    hints: [
      R`The centre of mass doesn't accelerate. Work with the extension $x = x_2 - x_1 - \ell$.`,
      R`$\ddot x = \ddot x_2 - \ddot x_1 = -\dfrac{kx}{m_2} - \dfrac{kx}{m_1}$.`
    ],
    sol: R`$\ddot x = -k\left(\dfrac{1}{m_1} + \dfrac{1}{m_2}\right)x$, so $\omega = \sqrt{k/\mu}$ with the reduced mass $\mu = \dfrac{m_1m_2}{m_1+m_2}$.

Checks: $m_2 \to\infty$ gives $\omega = \sqrt{k/m_1}$ (one end fixed ✓). Equal masses give $\omega = \sqrt{2k/m}$: each half of the spring has stiffness $2k$ with the centre fixed ✓.

HCl: $\mu = \dfrac{1\cdot 35}{36} \approx 0.97$ u, almost exactly the hydrogen mass. The heavy chlorine barely moves.`,
    insight: R`Find the right coordinate (the separation) and the problem reduces to one body. Always check limits.`,
    follow: R`What happens with three masses in a line joined by two springs? How many modes of vibration are there, and what do they look like?`
  });

  Q({ id: 'os-hoop', topic: 'oscillations', diff: 4, mins: 9,
    title: 'Hoop on a nail',
    q: R`A thin ring of radius $R$ hangs on a nail and swings in its own plane with small oscillations. Find the period. How long is the simple pendulum with the same period?`,
    hints: [
      R`The moment of inertia about the nail is $mR^2 + mR^2$ (parallel axis theorem).`,
      R`Torque $= -mgR\sin\theta \approx -mgR\theta$.`
    ],
    sol: R`$I = 2mR^2$. $\;2mR^2\ddot\theta = -mgR\theta \Rightarrow \omega = \sqrt{\dfrac{g}{2R}}$, $\;T = 2\pi\sqrt{\dfrac{2R}{g}}$.

The equivalent simple pendulum has length $2R$, the diameter, even though the centre of mass is only $R$ below the nail.`,
    insight: R`For a compound pendulum, $T = 2\pi\sqrt{I/(mgd)}$. Know the parallel axis theorem cold.`,
    follow: R`For a uniform rod pivoted at a distance $d$ from its centre, which $d$ gives the shortest period? (Answer: $d = L/\sqrt{12}$.)`
  });

  Q({ id: 'os-damped', topic: 'oscillations', diff: 4, mins: 12,
    title: 'Car suspension',
    q: R`A car's suspension is modelled as a mass $m$ on a spring $k$ with a damper (force $c\dot x$). Write and solve the equation of motion. What value of $c$ would you choose and why? Sketch the responses to a bump for light, critical and heavy damping.`,
    hints: [
      R`$m\ddot x + c\dot x + kx = 0$. Try $x = e^{\lambda t}$.`,
      R`The character of the solution depends on the sign of the discriminant $c^2 - 4mk$.`
    ],
    sol: R`$m\lambda^2 + c\lambda + k = 0 \Rightarrow \lambda = \dfrac{-c\pm\sqrt{c^2-4mk}}{2m}$.

<b>Light</b> ($c^2 < 4mk$): $x = Ae^{-ct/2m}\cos(\omega_d t + \phi)$, a decaying oscillation (the car bounces).

<b>Critical</b> ($c = 2\sqrt{mk}$): $x = (A + Bt)e^{-\omega_0 t}$, the fastest return without overshoot.

<b>Heavy</b>: the sum of two decaying exponentials, a slow creep back (harsh ride, poor tyre contact).

Real cars use about 0.2–0.4 of critical damping: a compromise between comfort (isolating road vibration), road holding and settling time.`,
    insight: R`The characteristic-equation approach for linear ODEs is beyond A-level for many students but is common in Cambridge interviews. Practise it.`,
    follow: R`For a car of 1200 kg sitting 5 cm lower when four 75 kg people get in, estimate the natural frequency. Why is around 1 Hz comfortable?`
  });

  Q({ id: 'os-springs', topic: 'oscillations', diff: 3, mins: 6,
    title: 'Cutting a spring in half',
    q: R`A mass on a spring oscillates with period $T$. (a) The spring is cut in half and the mass hung from one half. New period? (b) The two halves are used in parallel? (c) Does the period change if the setup is moved to the Moon, or placed on a frictionless slope?`,
    hints: [
      R`Each half stretches half as much under the same force, so its stiffness is doubled.`,
      R`Springs in parallel add stiffnesses. In series, compliances ($1/k$) add.`
    ],
    sol: R`<b>(a)</b> $k' = 2k$, so $T' = T/\sqrt2$.

<b>(b)</b> Parallel: $k'' = 4k$, so $T'' = T/2$.

<b>(c)</b> No change in either case. Gravity only shifts the equilibrium position; the restoring force about equilibrium is still $-kx$. (Unlike a pendulum, whose period depends on $g$.)`,
    insight: R`Constant forces shift equilibrium but don't change the dynamics of a linear system.`,
    follow: R`How could you use a mass on a spring to measure mass on the ISS?`
  });

  Q({ id: 'os-buoy', topic: 'oscillations', diff: 4, mins: 9,
    title: 'Bobbing buoy',
    q: R`A cylindrical buoy floats upright with depth $h$ submerged. It's pushed down a little and released. Show that it bobs with simple harmonic motion and find the period. Estimate the period for a buoy floating 1 m deep.`,
    hints: [
      R`At equilibrium, buoyancy equals weight: $\rho_w A h g = mg$.`,
      R`Extra depth $x$ gives an extra upward force $\rho_w A g x$.`
    ],
    sol: R`$m\ddot x = -\rho_w g A x$ with $m = \rho_w A h$, so $\ddot x = -\dfrac{g}{h}x$ and
$$T = 2\pi\sqrt{\frac{h}{g}},$$
the same as a pendulum of length $h$. For $h = 1$ m, $T \approx 2$ s. (Ignoring the "added mass" of water moving with the buoy, which lengthens the period a bit.)`,
    insight: R`Identify the restoring force per unit displacement (the effective stiffness) and the mass. That's all you need for any SHM problem.`,
    follow: R`Ships have a natural roll period too. Why is it dangerous if waves hit at that period? How do engineers detune it?`
  });

  Q({ id: 'os-resonance', topic: 'oscillations', diff: 4, mins: 10,
    title: 'Resonance and the wobbly bridge',
    q: R`A lightly damped oscillator (mass $m$, stiffness $k$, damping $c$) is driven by $F_0\cos\omega t$. Find the amplitude of the steady-state response. When is it largest? Use this to explain why London's Millennium Bridge wobbled and how it was fixed.`,
    hints: [
      R`Try $x = X\cos(\omega t - \phi)$, or use complex exponentials: $x = \text{Re}(\tilde X e^{i\omega t})$.`,
      R`$\tilde X(k - m\omega^2 + ic\omega) = F_0$.`
    ],
    sol: R`$$X = \frac{F_0}{\sqrt{(k - m\omega^2)^2 + (c\omega)^2}}.$$
This peaks near $\omega_0 = \sqrt{k/m}$, where $X \approx F_0/(c\omega_0)$. Light damping means huge amplification (the quality factor $Q = m\omega_0/c$).

Millennium Bridge: its lateral mode was near 1 Hz, the sideways frequency of walking. As it swayed, pedestrians adjusted their gait to match. That feedback (synchronisation) amounts to negative damping, so the amplitude grew. The fix was 37 viscous dampers and 52 tuned mass dampers, which raise the effective damping.`,
    insight: R`Complex exponentials turn differential equations into algebra. Combine the maths with a real case study. Interviewers value real-world knowledge.`,
    follow: R`How does a tuned mass damper (as in Taipei 101) work? Why does it split one resonant peak into two smaller ones?`
  });
})();
