/* Question bank: Fluids & Waves, Thermodynamics, Materials & Structures, Estimation, Motivation. */
(() => {
  const R = String.raw;
  const Q = (o) => window.QB.push(o);
  window.QB = window.QB || [];

  /* ───────────── FLUIDS & WAVES ───────────── */

  Q({ id: 'fl-cannonball', topic: 'fluids', diff: 3, mins: 6,
    title: 'Cannonball overboard',
    q: R`You're in a boat on a small lake with a heavy iron cannonball. You throw it overboard and it sinks. Does the lake's water level rise, fall, or stay the same? What if you throw a cork overboard? A bucket of lake water?`,
    hints: [
      R`A floating object displaces its own <b>weight</b> of water.`,
      R`A sunken object displaces its own <b>volume</b> of water.`
    ],
    sol: R`In the boat, the cannonball is effectively floating, so it displaces its weight: a volume $m/\rho_w$. On the lake bed it displaces only its own volume, $m/\rho_\text{iron}$, which is about 8 times smaller. <b>The water level falls.</b>

Cork: it floats either way, displacing its weight in both cases, so <b>no change</b>.

Bucket of lake water: in the boat it displaces its own weight of water, which is exactly its own volume, so <b>no change</b> either.`,
    insight: R`Archimedes, applied carefully: weight-displacement for floating, volume-displacement for sunk. Check each case separately.`,
    follow: R`A boat full of people passes through a canal lock. Does the water level in the lock depend on whether they're swimming or in the boat?`
  });

  Q({ id: 'fl-ice', topic: 'fluids', diff: 4, mins: 8,
    title: 'Melting ice cubes',
    q: R`An ice cube floats in a glass of water filled to the brim. When it melts, does the glass overflow? What if (a) the ice contains a small stone, (b) the ice contains an air bubble, (c) the glass holds salt water? What does this mean for sea level when (i) floating sea ice melts and (ii) Antarctic land ice melts?`,
    hints: [
      R`Floating ice displaces its own weight of liquid. When melted, it becomes that same weight of fresh water.`,
      R`Salt water is denser. Displacing the ice's weight takes a smaller volume of salt water than the meltwater occupies.`
    ],
    sol: R`<b>Pure ice in fresh water:</b> the ice displaces water of its own weight, and melting turns it into exactly that volume of water, so the level is <b>unchanged</b>.

<b>(a) Stone:</b> while floating, the stone's weight displaces water; once it sinks, it displaces only its volume, so the level <b>falls</b>.

<b>(b) Air bubble:</b> the air's mass is negligible, so it's <b>unchanged</b>.

<b>(c) Salt water:</b> the ice displaces $m/\rho_\text{salt}$, but melts to $m/\rho_\text{fresh}$, which is larger, so the level <b>rises slightly</b> (about 2.6% of the displaced volume).

Sea level: melting sea ice causes only a tiny rise, from effect (c). Melting land ice adds water that was never displacing anything, causing a large rise. (Thermal expansion of the ocean is also a major contributor.)`,
    insight: R`Track mass and density. The salt-water subtlety distinguishes good from excellent answers.`,
    follow: R`If all of Antarctica's ice melted, roughly how much would sea level rise? (Estimate it.)`
  });

  Q({ id: 'fl-hose', topic: 'fluids', diff: 4, mins: 9,
    title: 'Thumb over a hosepipe',
    q: R`Why does putting your thumb over the end of a garden hose make the water squirt further? Does the flow rate go up or down? Mains pressure is about 3 bar. How high could a fountain fed directly from the mains reach?`,
    hints: [
      R`Continuity: $Q = Av$. But is the flow rate fixed? It's the pressure that's roughly fixed by the mains.`,
      R`Without your thumb, where is most of the pressure "used up"?`,
      R`Bernoulli: $p = \tfrac12\rho v^2 = \rho gh$.`
    ],
    sol: R`The mains supplies a roughly fixed <b>pressure</b>, not a fixed flow. With an open hose, the flow is high and most of the pressure is lost to friction along the long hose, so the exit jet is relatively slow.

The thumb adds a restriction. The flow rate <b>falls</b>, so friction losses in the hose fall (they're roughly $\propto Q^2$), and more of the pressure is available at the nozzle and is converted into exit velocity ($v = \sqrt{2\Delta p/\rho}$). The jet is faster and goes further, even though less water comes out.

Fountain: $h = \dfrac{p}{\rho g} = \dfrac{3\times10^5}{1000\times9.8}\approx$ <b>30 m</b> (exit speed $\approx 24$ m/s), less in practice because of losses and air drag.`,
    insight: R`Question the "obvious" assumption. Continuity with fixed $Q$ is the common wrong answer. Thinking of the system as a pressure source with losses gives the right one.`,
    follow: R`Draw the analogy with a battery with internal resistance driving a load. What corresponds to the thumb?`
  });

  Q({ id: 'fl-siphon', topic: 'fluids', diff: 4, mins: 8,
    title: 'How does a siphon work?',
    q: R`Explain how a siphon works. How fast does water come out? What's the maximum height the tube can go over the barrier? Would a siphon work in a vacuum?`,
    hints: [
      R`Apply Bernoulli along a streamline from the reservoir surface to the outlet.`,
      R`The pressure at the top of the tube is below atmospheric. It can't fall below zero (in fact, below the water's vapour pressure).`
    ],
    sol: R`Bernoulli from the surface (atmospheric, $v \approx 0$) to the outlet a height $h$ below (atmospheric): $v = \sqrt{2gh}$. The tube must be full to start it.

At the crest, a height $H$ above the surface, $p = p_\text{atm} - \rho gH - \tfrac12\rho v^2$. This must stay above the vapour pressure, or the water boils and the column breaks: $H < \dfrac{p_\text{atm}}{\rho g} \approx$ <b>10 m</b> (less when flowing, and less again with dissolved gas).

The usual explanation is atmospheric pressure pushing water up the short leg. In a vacuum, ordinary siphons fail. But experiments show very clean, degassed water can siphon in a vacuum because of cohesion (tension in the liquid), much as trees lift sap.`,
    insight: R`Use Bernoulli for the speed and the pressure at the crest for the limit. Mentioning the vacuum debate shows wider reading.`,
    follow: R`How do 100 m tall trees get water to their leaves if atmospheric pressure can only lift it 10 m?`
  });

  Q({ id: 'fl-lift', topic: 'fluids', diff: 3, mins: 9,
    title: 'How do planes fly? Can they fly upside down?',
    q: R`(Commonly asked, including as a challenge to the personal statement.) Explain how a wing generates lift, more carefully than the "equal transit time" explanation (which is wrong). Can a plane fly upside down? Estimate the lift coefficient a fully loaded 747 needs at take-off (400 t, wing area 510 m², 80 m/s).`,
    hints: [
      R`The wing turns the airflow downwards: momentum is given to the air (Newton's third law).`,
      R`Equivalently, there's lower pressure above and higher below. Both are true; they're the same physics.`,
      R`$L = \tfrac12\rho v^2SC_L$.`
    ],
    sol: R`A wing at an angle of attack (and/or with camber) deflects air <b>downwards</b>. The rate of change of downward momentum of the air equals the lift. The same flow field has lower pressure over the top (faster flow, curved streamlines) and higher pressure underneath. The "equal transit time" idea is false: air over the top actually arrives at the trailing edge <i>sooner</i>.

Upside down: yes. Lift depends mainly on the angle of attack, so an inverted plane pitches its nose "up" relative to the airflow. Aerobatic planes use symmetric aerofoils for this. Ordinary airliners have cambered wings and fuel and oil systems not designed for it, so it's less efficient but possible.

747: $C_L = \dfrac{mg}{\tfrac12\rho v^2S} = \dfrac{3.9\times10^6}{0.5\times1.2\times6400\times510}\approx$ <b>2</b>. That's high: it needs flaps and slats extended.`,
    insight: R`Give the momentum explanation and the pressure explanation, and show they agree. Then estimate. Debunking a myth confidently impresses.`,
    follow: R`Why do wings stall at high angle of attack? Why do planes take off into the wind?`
  });

  Q({ id: 'fl-doppler', topic: 'fluids', diff: 4, mins: 9,
    title: 'Doppler and the bat',
    q: R`Derive the frequency heard by a stationary listener as a source of frequency $f$ approaches at speed $v$. A bat flying at speed $u$ emits a chirp of frequency $f$ towards a wall ahead. What frequency does it hear in the echo? Approximate for $u \ll c$.`,
    hints: [
      R`The source moves $vT$ between emitting successive crests, so the wavelength in front is shortened to $(c - v)T$.`,
      R`For the bat: the wall "hears" a moving-source frequency, and then the bat is a moving observer of the reflected wave.`
    ],
    sol: R`Moving source: $\lambda' = (c - v)/f$, so $f' = \dfrac{c}{c-v}f$.

Bat: the wall receives $f_1 = \dfrac{c}{c-u}f$. The wall re-emits $f_1$, and the bat, as an observer moving towards it, hears $f_2 = \dfrac{c+u}{c}f_1$. So
$$f_2 = \frac{c+u}{c-u}f \approx \left(1 + \frac{2u}{c}\right)f.$$
At $u = 5$ m/s and $c = 340$ m/s, that's a 3% shift, which bats can detect easily. The factor of 2 is the same as in police radar guns.`,
    insight: R`Treat moving source and moving observer separately: they aren't symmetric for sound (there is a medium). Approximate at the end.`,
    follow: R`What happens when the source moves faster than sound? Explain a sonic boom and find the cone angle ($\sin\theta = c/v$).`
  });

  Q({ id: 'fl-beats', topic: 'fluids', diff: 3, mins: 6,
    title: 'Tuning by beats',
    q: R`Two guitar strings are tuned to nearly the same note, 440 Hz and 442 Hz. Played together, the sound gets loud and soft regularly. Explain this mathematically and find how often it happens. How does a musician use it?`,
    hints: [
      R`Use $\sin A + \sin B = 2\sin\frac{A+B}{2}\cos\frac{A-B}{2}$.`
    ],
    sol: R`$$\sin(2\pi f_1t) + \sin(2\pi f_2t) = 2\cos\!\left(2\pi\frac{f_1-f_2}{2}t\right)\sin\!\left(2\pi\frac{f_1+f_2}{2}t\right).$$
We hear a 441 Hz tone whose amplitude envelope varies at $(f_2 - f_1)/2 = 1$ Hz. Loudness peaks twice per envelope cycle, so the <b>beat frequency</b> is $|f_1 - f_2| = 2$ Hz.

A musician adjusts the tension until the beats slow down and disappear, at which point the frequencies are equal.`,
    insight: R`Sum-to-product identities show "a fast oscillation modulated by a slow one". The same maths underlies AM radio and heterodyne receivers.`,
    follow: R`Why does a major chord sound "consonant"? Think about frequency ratios like 4:5:6.`
  });

  Q({ id: 'fl-stokes', topic: 'fluids', diff: 4, mins: 9,
    title: 'Ball falling through oil',
    q: R`Use dimensional analysis to find how the drag on a small sphere moving slowly through a viscous fluid depends on its radius $r$, speed $v$ and the viscosity $\eta$ (units Pa·s). Hence find how the terminal velocity depends on $r$. Why does fine sand settle so much more slowly than coarse sand?`,
    hints: [
      R`Write $F = k\,r^a v^b\eta^c$ and match the powers of kg, m and s.`,
      R`$[\eta] = \text{kg m}^{-1}\text{s}^{-1}$.`,
      R`At terminal velocity, drag balances weight minus buoyancy $\propto r^3$.`
    ],
    sol: R`$\text{kg m s}^{-2} = \text{m}^a(\text{m s}^{-1})^b(\text{kg m}^{-1}\text{s}^{-1})^c$. kg: $c = 1$. s: $-2 = -b - c$, so $b = 1$. m: $1 = a + b - c$, so $a = 1$. Hence $F \propto \eta rv$ (Stokes: $F = 6\pi\eta rv$).

Terminal: $6\pi\eta rv = \tfrac43\pi r^3(\rho_s - \rho_f)g \Rightarrow v = \dfrac{2(\rho_s-\rho_f)gr^2}{9\eta} \propto r^2$.

Grains 10 times smaller settle 100 times more slowly, which is why fine silt stays suspended in rivers and clay takes days to settle. (This only holds at low Reynolds number. For large, fast objects, drag $\propto \rho r^2v^2$ instead.)`,
    insight: R`Dimensional analysis gives the scaling, though not the constant. Always state its validity range (low Reynolds number).`,
    follow: R`Why could dimensional analysis alone not tell you whether density matters? (You'd have two dimensionless groups, so you need physical insight.)`
  });

  Q({ id: 'fl-tsunami', topic: 'fluids', diff: 4, mins: 9,
    title: 'Speed of a tsunami',
    q: R`Using dimensional analysis, how might the speed of water waves depend on $g$, the wavelength $\lambda$ and the water depth $h$? A tsunami has a wavelength of about 200 km in an ocean 4 km deep. Estimate its speed. What happens as it approaches the shore?`,
    hints: [
      R`There are two length scales, so dimensional analysis gives $v = \sqrt{g\lambda}\,f(h/\lambda)$.`,
      R`In deep water ($h \gg \lambda$) the depth shouldn't matter. In shallow water ($h \ll \lambda$) the wavelength shouldn't matter.`
    ],
    sol: R`$v = \sqrt{g\lambda}\,f(h/\lambda)$. Deep water: $v \propto \sqrt{g\lambda}$. Shallow water: $v \propto \sqrt{gh}$ (exactly $v = \sqrt{gh}$).

A tsunami has $\lambda \gg h$, so it's a <b>shallow-water</b> wave: $v = \sqrt{9.8\times4000}\approx 200$ m/s $\approx$ <b>700 km/h</b>, as fast as a jet airliner.

Approaching the shore, $h$ falls, the wave slows, the wavelength shortens, and the energy flux (roughly conserved) squeezes into less water. The amplitude grows dramatically (Green's law, $A\propto h^{-1/4}$), from under 1 m in the open ocean to 10 m or more at the coast.`,
    insight: R`With two length scales, dimensional analysis needs physical limits to fix the form. "Which regime are we in?" is the key engineering question.`,
    follow: R`Why do waves on a beach arrive parallel to the shore, even if the wind is at an angle? (Refraction: the shallow-water speed depends on depth.)`
  });

  Q({ id: 'fl-diver', topic: 'fluids', diff: 3, mins: 6,
    title: 'Cartesian diver',
    q: R`A small inverted vial with a bubble of air in it floats just at the top of a sealed plastic bottle of water. When you squeeze the bottle, the vial sinks; release it and the vial rises. Explain. Is there a depth at which it would stay put, and is that equilibrium stable?`,
    hints: [
      R`Squeezing raises the pressure throughout the water (Pascal).`,
      R`The air bubble compresses (Boyle's law), so the diver displaces less water.`
    ],
    sol: R`Squeezing increases the pressure everywhere in the water. The air bubble in the vial compresses ($pV$ = const), water enters the vial, and its displacement and buoyancy fall. When buoyancy drops below the weight, it sinks.

The pressure also rises with depth, so a sinking diver compresses further and sinks faster. There's a depth at which buoyancy exactly equals weight, but it's <b>unstable</b>: a little deeper, it compresses more and keeps sinking; a little shallower, it expands and rises. Submarines must actively control their buoyancy for exactly this reason.`,
    insight: R`Combine Pascal, Boyle and Archimedes. Then analyse stability by considering a small displacement. That last step is what the interviewer is waiting for.`,
    follow: R`How does a fish control its depth? Why do divers have to equalise and control buoyancy continuously?`
  });

  /* ───────────── THERMODYNAMICS & POWER ───────────── */

  Q({ id: 'th-fridge', topic: 'thermo', diff: 3, mins: 8,
    title: 'How does a fridge work?',
    q: R`(Commonly cited as a Cambridge Engineering question.) Explain how a fridge works. Can you cool your kitchen by leaving the fridge door open? Define the coefficient of performance and find its theoretical maximum for a fridge at 4 °C in a 20 °C kitchen.`,
    hints: [
      R`A refrigerant evaporates at low pressure inside (absorbing heat) and condenses at high pressure outside (releasing heat).`,
      R`Energy conservation: heat dumped = heat removed + electrical work.`,
      R`Carnot: $\text{COP}_\text{max} = \dfrac{T_c}{T_h - T_c}$.`
    ],
    sol: R`Cycle: a compressor raises the refrigerant's pressure and temperature. In the coils at the back it condenses, releasing heat to the kitchen. It passes through an expansion valve, where its pressure and temperature drop. Inside, it evaporates, absorbing heat from the food. Heat is pumped "uphill" from cold to hot, which takes work (second law).

<b>Door open:</b> the fridge dumps $Q_c + W$ into the kitchen while removing $Q_c$ from it. The net effect is to <b>heat</b> the kitchen by $W$.

$\text{COP} = Q_c/W$. Max $= \dfrac{277}{293 - 277} \approx 17$. Real fridges reach about 2–4, because of finite temperature differences in the heat exchangers, compressor inefficiency and throttling losses.`,
    insight: R`Draw the energy flows as a box diagram. The "door open" twist is a test of whether you really apply energy conservation.`,
    follow: R`A heat pump is the same machine. Why can it deliver 3 kW of heat for 1 kW of electricity without violating energy conservation?`
  });

  Q({ id: 'th-power-station', topic: 'thermo', diff: 4, mins: 10,
    title: 'Efficiency of a steam power station',
    q: R`Estimate the efficiency of a steam turbine power station. What is the theoretical limit, and what are the main sources of irreversibility that stop real plants reaching it? How do combined-cycle gas turbine (CCGT) plants do better?`,
    hints: [
      R`Carnot: $\eta = 1 - T_c/T_h$. Typical steam reaches about 600 °C, and the condenser is at about 30 °C.`,
      R`Irreversibilities: heat transfer across a finite temperature difference, friction, throttling, mixing…`
    ],
    sol: R`Carnot limit: $1 - \dfrac{303}{873}\approx 65\%$. Real plants: <b>35–45%</b>.

Losses and irreversibilities:
• <b>Combustion and heat transfer:</b> the flame is at about 2000 K but the steam only at 870 K. Heat flowing across that gap generates lots of entropy, and is the largest loss.
• Stack losses (hot flue gases).
• Turbine friction and blade losses (isentropic efficiency of about 90%).
• Pump losses, pressure drops, and condenser heat rejection (required by the second law, not a "loss" in the same sense).

CCGT: a gas turbine runs on combustion gases at about 1500 °C (a high $T_h$), and its 600 °C exhaust then raises steam for a second (steam) cycle. Overall efficiency is about <b>60%</b>.`,
    insight: R`Carnot gives the ceiling. Identifying the <i>largest</i> irreversibility (the temperature drop from flame to steam) is the expert-level insight.`,
    follow: R`Why are power stations built next to rivers or with cooling towers? Could the condenser heat be used?`
  });

  Q({ id: 'th-piston', topic: 'thermo', diff: 4, mins: 9,
    title: 'Compressing gas in a cylinder',
    q: R`(Commonly cited as a Cambridge Engineering question.) Air at 300 K and 1 atm in a sealed cylinder is compressed to one-tenth of its volume. Find the final pressure and temperature if the compression is (a) slow (isothermal), (b) rapid (adiabatic, $\gamma = 1.4$). Use this to explain how a diesel engine ignites its fuel without a spark plug.`,
    hints: [
      R`Isothermal: $pV$ = const. Adiabatic: $pV^\gamma$ = const and $TV^{\gamma-1}$ = const.`,
      R`$10^{0.4} \approx 2.5$.`
    ],
    sol: R`<b>(a)</b> $p = 10$ atm, $T = 300$ K (the heat flows out as it's compressed).

<b>(b)</b> $p = 10^{1.4}\approx 25$ atm and $T = 300\times10^{0.4}\approx$ <b>750 K</b> (480 °C). All the work done goes into internal energy.

A diesel engine compresses air rapidly with a ratio of about 18–20: $T \approx 300\times20^{0.4}\approx 1000$ K, above diesel's autoignition temperature (about 500 K). Fuel injected into the hot air ignites spontaneously. (You can feel the same effect when a bicycle pump gets hot.)`,
    insight: R`"Fast" means adiabatic (no time for heat transfer). Plug in numbers, then connect to a real machine.`,
    follow: R`Why does a higher compression ratio make an engine more efficient? Why can't petrol engines use diesel-like compression ratios? (Knock.)`
  });

  Q({ id: 'th-balloon', topic: 'thermo', diff: 3, mins: 8,
    title: 'Hot air balloon',
    q: R`Estimate the volume of a hot air balloon needed to lift 500 kg (envelope, basket and passengers) with the air inside at 100 °C and outside at 20 °C. Why do balloons fly better on cold mornings? What limits how hot you can make the air?`,
    hints: [
      R`At constant pressure, $\rho \propto 1/T$ (ideal gas).`,
      R`Lift per unit volume $= (\rho_\text{out} - \rho_\text{in})g$.`
    ],
    sol: R`$\rho_\text{in} = 1.2\times\dfrac{293}{373}\approx 0.94$ kg/m³, so the net lift is $0.26$ kg per m³.

$V = 500/0.26\approx$ <b>1900 m³</b>: a sphere of radius about 7.7 m. (Real balloons are 2000–3000 m³.)

On a cold morning, $\rho_\text{out}$ is higher, so the density difference for the same internal temperature is bigger. The limit is the envelope fabric (nylon degrades above about 120 °C), and fuel consumption rises steeply with temperature because of heat loss through the envelope.`,
    insight: R`A clean Fermi estimate from the ideal gas law. Sanity-check against real balloon sizes.`,
    follow: R`How high can the balloon go? (The air density falls with altitude: the scale height is about 8 km.)`
  });

  Q({ id: 'th-kettle', topic: 'thermo', diff: 3, mins: 7,
    title: 'Kettles and heat pumps',
    q: R`How long does a 2 kW kettle take to boil 1 litre of water from 20 °C? In reality it takes a little longer. Why? Then: why might a 1 kW heat pump heat a house more effectively than a 3 kW electric heater?`,
    hints: [
      R`$Q = mc\Delta T$ with $c = 4200$ J/kg K.`,
      R`A heater converts electricity to heat at 100%. A heat pump moves heat from outdoors.`
    ],
    sol: R`$Q = 1\times4200\times80 = 336$ kJ, so $t = 336\,000/2000 = 168$ s $\approx$ <b>3 minutes</b>.

It takes longer because of heat loss from the kettle's walls (increasing as it gets hotter), heating the kettle itself and the element, and some evaporation.

A resistive heater turns 1 kW of electricity into 1 kW of heat. A heat pump uses 1 kW of work to <b>move</b> heat from the cold outdoors to indoors, delivering $Q_h = \text{COP}\times W\approx 3$–4 kW. The Carnot limit for 20 °C inside and 0 °C outside is $293/20\approx 15$. A 1 kW heat pump can beat a 3 kW heater.`,
    insight: R`Simple calculation first, then a list of what was ignored. Heat pumps are a hot topic in decarbonisation, so mention that.`,
    follow: R`Why do heat pumps get less effective in very cold weather? Should we heat homes with electricity from gas power stations or burn the gas at home?`
  });

  Q({ id: 'th-expansion', topic: 'thermo', diff: 3, mins: 7,
    title: 'Does the hole get bigger?',
    q: R`(Commonly cited as a Cambridge Engineering question.) A metal plate has a circular hole in it. When the plate is heated, does the hole get larger or smaller? Justify carefully. Then estimate how much a 1 km steel railway line expands between winter and summer, and explain how railways cope.`,
    hints: [
      R`Imagine the hole filled with a disc of the same metal. What would the disc do?`,
      R`Linear expansion: $\Delta L = \alpha L\Delta T$, and $\alpha_\text{steel}\approx 12\times10^{-6}$ K⁻¹.`
    ],
    sol: R`<b>Larger.</b> Thermal expansion scales every length in the plate by the same factor $(1 + \alpha\Delta T)$, like a photographic enlargement. Every distance grows, including the hole's diameter. If the hole were filled with a metal disc, that disc would expand too and still fit perfectly.

Rail: $\Delta L = 12\times10^{-6}\times1000\times40\approx$ <b>0.5 m</b> for a 40 K range.

Old railways had gaps between short rails (the "clickety-clack"). Modern continuous welded rail is pre-tensioned (laid at a "neutral" temperature) and firmly anchored to sleepers and ballast, so the expansion becomes stress rather than movement. On very hot days, rails can still buckle.`,
    insight: R`A clever thought experiment (filling the hole) beats algebra. Then show you know how it matters in engineering practice.`,
    follow: R`How does a bimetallic strip thermostat work? Derive which way it bends.`
  });

  Q({ id: 'th-house', topic: 'thermo', diff: 3, mins: 9,
    title: 'Heat loss from a house',
    q: R`Estimate the heating power needed to keep a typical house at 20 °C when it's 5 °C outside. Which part of the house loses the most heat? Explain why double glazing works, and why the air gap isn't made wider.`,
    hints: [
      R`Heat loss through each element: $P = UA\,\Delta T$. U-values: modern wall ≈ 0.3, roof ≈ 0.2, single glazing ≈ 5.8, double ≈ 2.8 W/m²K.`,
      R`Thermal resistances in series add, like electrical resistors.`
    ],
    sol: R`Say walls 100 m² × 0.3, windows 20 m² × 2.8, roof 50 m² × 0.2, floor 50 m² × 0.3, with $\Delta T = 15$ K:
walls ≈ 450 W, windows ≈ 840 W, roof ≈ 150 W, floor ≈ 225 W, plus ventilation ($\dot m c\Delta T$: about 0.5 air changes per hour of 250 m³ gives about 600 W). Total ≈ <b>2–3 kW</b>. Windows and ventilation dominate.

Double glazing adds the air gap's thermal resistance in series. Air's conductivity is about 0.025 W/m K, 40 times lower than glass. But if the gap is too wide (above about 20 mm), the air starts to <b>convect</b>, carrying heat across. 12–16 mm is the sweet spot, and argon fill is better still.`,
    insight: R`The circuit analogy (heat flow ↔ current, $\Delta T$ ↔ voltage, $1/UA$ ↔ resistance) makes complex problems simple.`,
    follow: R`Why does a duvet keep you warm? Why does a wet coat feel so cold?`
  });

  /* ───────────── MATERIALS & STRUCTURES ───────────── */

  Q({ id: 'ma-sausage', topic: 'materials', diff: 4, mins: 9,
    title: 'Why sausages split lengthways',
    q: R`(Commonly cited as a Cambridge Engineering question.) Why do sausages (and frozen water pipes) split along their length rather than around their circumference? Derive the stresses in a thin-walled cylinder of radius $r$ and wall thickness $t$ under internal pressure $p$.`,
    hints: [
      R`Cut the cylinder in half lengthways. Balance the pressure force on the half against the wall tension on the two cut edges.`,
      R`Then cut it across. Balance the pressure on the end cap against the stress around the circumference.`
    ],
    sol: R`<b>Hoop stress:</b> for a length $L$ cut lengthways, the pressure force is $p\cdot2rL$, resisted by two walls of area $tL$: $\sigma_h = \dfrac{pr}{t}$.

<b>Axial stress:</b> the end force $p\pi r^2$ is resisted by the ring area $2\pi rt$: $\sigma_a = \dfrac{pr}{2t}$.

The hoop stress is <b>twice</b> the axial stress, so the skin first fails in the hoop direction. A crack forms perpendicular to the largest stress, which means it runs <b>along</b> the length.

Engineering use: pressure vessels and pipes are designed for hoop stress. Spherical vessels have $\sigma = pr/2t$ everywhere, which is why gas tanks are often spherical or have hemispherical ends.`,
    insight: R`Free-body cuts on a pressurised shell. This is standard first-year Cambridge material, so being able to derive it is a big plus.`,
    follow: R`Why do you prick sausages? Why do boiled eggs crack, and why does adding salt or vinegar help?`
  });

  Q({ id: 'ma-concrete', topic: 'materials', diff: 3, mins: 8,
    title: 'Concrete, steel or earth?',
    q: R`(Commonly cited as a Cambridge Engineering question.) Why are some bridges and dams made of concrete, some of steel, and some just of compacted earth? Why is concrete reinforced with steel, and what is prestressing?`,
    hints: [
      R`Concrete is strong in compression and weak in tension (about 10×).`,
      R`Think about cost per unit strength, what kind of loading each structure carries, and where tension appears in a beam.`
    ],
    sol: R`<b>Concrete:</b> cheap, mouldable, durable, strong in compression. Good for arches, piers, foundations and gravity dams.

<b>Steel:</b> strong in tension and compression, light for its strength and ductile. Good for long spans, cables and trusses. But it's expensive, corrodes and loses strength in fires.

<b>Earth:</b> extremely cheap in bulk, and mass is what resists water in an embankment dam. Low strength doesn't matter if the structure is huge and only lightly stressed.

<b>Reinforcement:</b> in a beam, the bottom face is in tension and concrete cracks there. Steel bars carry that tension.

<b>Prestressing:</b> tendons are tensioned so that the concrete is pre-compressed. Under service load, the bending tension only reduces the compression, so the concrete never cracks. This allows longer, thinner spans.`,
    insight: R`Match the material to the load type (compression vs tension), then bring in cost, durability and manufacturability. Engineering is about trade-offs.`,
    follow: R`Why are Roman concrete structures still standing after 2000 years when some modern reinforced concrete crumbles in 50?`
  });

  Q({ id: 'ma-scaling', topic: 'materials', diff: 4, mins: 9,
    title: 'How tall can a tower be?',
    q: R`How tall can a uniform column of steel be before its base is crushed by its own weight (yield strength 250 MPa, density 7800 kg/m³)? What about concrete (30 MPa, 2400 kg/m³)? Use the same ideas to explain why an ant can carry 50 times its weight but an elephant can't.`,
    hints: [
      R`Stress at the base $= \rho gh$, independent of the cross-section.`,
      R`Square–cube law: strength $\propto$ area $\propto L^2$, weight $\propto$ volume $\propto L^3$.`
    ],
    sol: R`$h_\text{max} = \dfrac{\sigma}{\rho g}$. Steel: $\dfrac{250\times10^6}{7800\times9.8}\approx$ <b>3.3 km</b>. Concrete: $\dfrac{30\times10^6}{2400\times9.8}\approx$ <b>1.3 km</b>. (The Burj Khalifa is 0.83 km. Tapering helps a lot, and wind load and buckling usually dominate before crushing.)

Animals: muscle force and bone strength scale as $L^2$, weight as $L^3$, so the strength-to-weight ratio $\propto 1/L$. An ant ($L\sim$ 5 mm) versus an elephant ($L\sim$ 3 m) differ by a factor of about 600. So elephants need disproportionately thick legs (Galileo noticed this).`,
    insight: R`Scaling laws are among the most powerful tools in engineering estimation. State clearly what's held constant.`,
    follow: R`Why can a tapered tower be taller than a uniform one? What shape makes the stress the same at every height? (Exponential taper.)`
  });

  Q({ id: 'ma-properties', topic: 'materials', diff: 3, mins: 8,
    title: 'Stiff, strong, tough or hard?',
    q: R`Explain the difference between stiffness, strength, toughness and hardness, with an example of a material that is high in one and low in another. Why does glass break so easily when it's theoretically very strong?`,
    hints: [
      R`Sketch stress–strain curves for glass, steel and rubber.`,
      R`Cracks concentrate stress at their tips.`
    ],
    sol: R`<b>Stiffness</b> (Young's modulus $E$): resistance to elastic deformation. Steel is very stiff, rubber isn't.
<b>Strength:</b> the stress at yield or fracture. High-tensile steel is strong. Glass is theoretically strong but practically weak.
<b>Toughness:</b> energy absorbed before fracture (resistance to crack growth). Steel is tough, glass is brittle.
<b>Hardness:</b> resistance to surface indentation and scratching. Diamond and glass are hard but brittle.

Glass: tiny surface scratches act as cracks. The stress at a crack tip is amplified by about $2\sqrt{a/\rho}$, where $a$ is the crack length and $\rho$ the tip radius. Glass can't yield plastically to blunt the tip, so the crack runs (Griffith: $\sigma_f\propto\sqrt{E\gamma/a}$). Freshly drawn glass fibres with no flaws can be 100 times stronger.`,
    insight: R`Use precise vocabulary. Interviewers notice when "strong" and "stiff" are confused. Linking flaws to fracture is first-year materials.`,
    follow: R`How does toughened (tempered) glass work, and why does it shatter into small cubes?`
  });

  Q({ id: 'ma-tube', topic: 'materials', diff: 4, mins: 9,
    title: 'Why bike frames are tubes',
    q: R`Compare the bending stiffness of a solid rod of radius $a$ with a tube of the same mass (same material) whose outer radius is $2a$. Why don't we make tubes with ever-larger radius and ever-thinner walls?`,
    hints: [
      R`$I_\text{solid} = \dfrac{\pi a^4}{4}$ and $I_\text{tube} = \dfrac{\pi(b^4 - c^4)}{4}$.`,
      R`Same mass means the same cross-sectional area: $b^2 - c^2 = a^2$.`,
      R`$b^4 - c^4 = (b^2 - c^2)(b^2 + c^2)$.`
    ],
    sol: R`$$\frac{I_\text{tube}}{I_\text{solid}} = \frac{(b^2-c^2)(b^2+c^2)}{a^4} = \frac{b^2+c^2}{a^2}.$$
With $b = 2a$: $c^2 = 3a^2$, so the ratio is $4 + 3 = $ <b>7</b>. The tube is seven times stiffer for the same mass.

Limit: very thin walls fail by <b>local buckling</b> (crinkling, like crushing a drinks can) and are vulnerable to dents. There's an optimum wall thickness, and real frames often use "butted" tubes, thicker at the joints where the stresses are highest.`,
    insight: R`Put material far from the neutral axis, but watch for a new failure mode. The same story as I-beams.`,
    follow: R`Bones are hollow too. What's in the middle, and why might nature not go to the thinnest possible walls?`
  });

  Q({ id: 'ma-buckling', topic: 'materials', diff: 4, mins: 10,
    title: 'Buckling and spaghetti',
    q: R`Why does a long slender column fail by buckling rather than crushing? How does the buckling load depend on length? Bonus: why does dry spaghetti, bent from its ends, almost never break into just two pieces?`,
    hints: [
      R`Euler buckling: $P_c = \dfrac{\pi^2EI}{L^2}$ for a pin-ended column.`,
      R`Compare $P_c$ with the crushing load $\sigma_yA$. The crossover depends on slenderness $L/r$.`,
      R`For spaghetti, think about what happens to the rest of the strand at the moment of the first break.`
    ],
    sol: R`A slightly bent column under load $P$ has a bending moment $Pv$ that bends it further. The elastic stiffness resists this. Above $P_c = \pi^2EI/L^2$, the bending moment wins and the deflection grows without limit.

$P_c\propto 1/L^2$: double the length and the column buckles at a quarter of the load. Crushing needs $\sigma_yA$. Buckling governs when $\dfrac{\pi^2EI}{L^2} < \sigma_yA$, i.e. for slender columns ($L/r$ larger than about 100 for steel). That's why scaffolding and bridge struts are braced at intervals.

Spaghetti: when it first snaps (at the point of maximum curvature), each half suddenly loses its bending moment at the broken end. A wave of extra curvature travels along the fragments, briefly raising the local bending well above what it was, so they snap again (Audoly & Neukirch, 2005). Twisting the strand first helps get two pieces.`,
    insight: R`Stability failures are about geometry and stiffness, not material strength. Identifying the governing failure mode is the key engineering judgement.`,
    follow: R`Why are the struts in a truss bridge often thicker than the ties, even if they carry the same magnitude of force?`
  });

  /* ───────────── ESTIMATION & MODELLING ───────────── */

  Q({ id: 'es-cyclist', topic: 'estimation', diff: 3, mins: 8,
    title: 'Power of a cyclist up a hill',
    q: R`Estimate the power a cyclist produces riding up a 5% hill at 18 km/h. Which term dominates? What about on the flat at 40 km/h?`,
    hints: [
      R`Three terms: gravity $mgv\sin\theta$, air drag $\tfrac12\rho C_DAv^3$, rolling resistance $C_{rr}mgv$.`,
      R`Take rider + bike as 80 kg, $C_DA \approx 0.4$ m², $C_{rr}\approx 0.005$.`
    ],
    sol: R`$v = 5$ m/s.
Gravity: $80\times9.8\times5\times0.05\approx 196$ W.
Drag: $0.5\times1.2\times0.4\times125\approx 30$ W.
Rolling: $0.005\times80\times9.8\times5\approx 20$ W.
Total ≈ <b>250 W</b>, <b>dominated by gravity</b>.

On the flat at 40 km/h (11 m/s): drag $\approx 0.5\times1.2\times0.3\times11^3\approx 240$ W (crouched, $C_DA = 0.3$), rolling about 45 W: roughly 300 W, <b>dominated by drag</b>, which scales as $v^3$.

A fit amateur sustains about 200–250 W, and a Tour de France rider about 400 W for an hour.`,
    insight: R`List the mechanisms, estimate each with stated assumptions, and say which dominates. Then sanity-check against something you know.`,
    follow: R`Why do cyclists in a peloton save so much energy? Why do climbers care about weight while time-triallists care about aerodynamics?`
  });

  Q({ id: 'es-atmosphere', topic: 'estimation', diff: 3, mins: 6,
    title: 'Mass of the atmosphere',
    q: R`Estimate the mass of air in this room, and the mass of the entire Earth's atmosphere, using only atmospheric pressure and the size of the Earth.`,
    hints: [
      R`The air density at sea level is about 1.2 kg/m³.`,
      R`Atmospheric pressure is the weight of the air column above each square metre.`
    ],
    sol: R`Room: 5 × 4 × 2.5 m = 50 m³, so about <b>60 kg</b> of air (heavier than you might expect).

Atmosphere: $p = \dfrac{Mg}{4\pi R^2} \Rightarrow M = \dfrac{4\pi R^2p}{g} = \dfrac{4\pi(6.4\times10^6)^2\times10^5}{9.8}\approx$ <b>$5\times10^{18}$ kg</b>, about a millionth of the Earth's mass.`,
    insight: R`Find a clever physical relation (pressure = weight per area) rather than integrating density over height.`,
    follow: R`If the atmosphere had uniform density 1.2 kg/m³, how thick would it be? (About 8.5 km: the "scale height".)`
  });

  Q({ id: 'es-wind', topic: 'estimation', diff: 4, mins: 10,
    title: 'Wind turbines for the UK',
    q: R`Estimate the power from one large wind turbine, and how many would be needed to supply the UK's average electricity demand. What's the theoretical maximum fraction of the wind's power a turbine can extract?`,
    hints: [
      R`The kinetic energy flux through area $A$ is $\tfrac12\rho Av^3$.`,
      R`Rotor diameter about 120 m, rated wind speed about 12 m/s, real turbines capture about 45%, capacity factor about 35%.`,
      R`UK average electricity demand is about 30 GW.`
    ],
    sol: R`$A = \pi\times60^2\approx 11\,000$ m². $P = 0.45\times\tfrac12\times1.2\times11\,000\times12^3\approx$ <b>5 MW</b> rated. Averaged with a 35% capacity factor: about 1.8 MW.

UK: $30\text{ GW}/1.8\text{ MW}\approx$ <b>17 000 turbines</b>, plus storage and backup for calm spells.

<b>Betz limit:</b> 16/27 ≈ 59%. You can't extract everything: if the air stopped completely behind the turbine, no more air could flow through. The optimum slows the wind to one-third of its upstream speed.`,
    insight: R`The cube law in $v$ is crucial: double the wind speed, eight times the power. That's why sites matter and why capacity factor is low.`,
    follow: R`Why are offshore turbines worth the extra cost? Why are turbines three-bladed rather than two or many?`
  });

  Q({ id: 'es-ev', topic: 'estimation', diff: 3, mins: 9,
    title: 'Electric car versus petrol',
    q: R`Compare the energy stored in a full 50 L petrol tank with that in a 60 kWh battery. Why can an electric car still go about as far on its battery? Estimate both ranges.`,
    hints: [
      R`Petrol: about 34 MJ/L (46 MJ/kg). 1 kWh = 3.6 MJ.`,
      R`Efficiency: petrol engine about 25–30%, electric drivetrain about 85–90%, plus regenerative braking.`
    ],
    sol: R`Petrol: $50\times34 = 1700$ MJ $\approx 470$ kWh, about 8 times the battery's 60 kWh. Per kilogram it's far worse: Li-ion is about 0.25 kWh/kg against 12.8 kWh/kg for petrol, a factor of about 50.

But useful work is about 0.27 × 470 ≈ 130 kWh for petrol against 0.9 × 60 ≈ 54 kWh for the battery. A car needs about 15–20 kWh/100 km at the wheels, so the EV's range is about <b>300–350 km</b> and the petrol car's about <b>700 km</b>.

The EV closes much of the gap through efficiency: no idling losses, regenerative braking, and no heat engine limited by Carnot.`,
    insight: R`Separate energy stored from energy usefully delivered. Efficiency differences can overturn a raw comparison.`,
    follow: R`If the electricity comes from a gas power station (50% efficient), which car emits less CO₂ per km?`
  });

  Q({ id: 'es-mouse', topic: 'estimation', diff: 4, mins: 10,
    title: 'Why a mouse survives a fall',
    q: R`A mouse can survive a fall from almost any height; a human can't. Use scaling arguments to explain why. How does terminal velocity scale with an animal's size $L$, and how does the stress at impact scale?`,
    hints: [
      R`Weight $\propto L^3$, drag $\propto L^2v^2$. Find $v_t(L)$.`,
      R`The stopping distance on impact is $\propto L$ (the body squashes a fraction of its size).`,
      R`Stress = force / area.`
    ],
    sol: R`Terminal velocity: $L^3\propto L^2v_t^2 \Rightarrow v_t\propto\sqrt L$. A mouse (about 5 cm) falls at about 10 m/s, a human (about 1.8 m) at about 55 m/s.

Impact deceleration: $a\approx\dfrac{v^2}{2d}\propto\dfrac{L}{L}$, which is roughly independent of size! But the stress in the body is $\dfrac{ma}{A}\propto\dfrac{L^3}{L^2} = L$. So larger animals suffer proportionally larger stresses, while tissue strength is the same.

Haldane's summary: "a mouse is slightly stunned and walks away; a rat is killed; a man is broken; a horse splashes".`,
    insight: R`Chain scaling laws carefully. The surprising intermediate result (size-independent deceleration) shows deep understanding.`,
    follow: R`Why do insects not fear falling at all? Why can't you scale up a flea and have it jump over buildings?`
  });

  Q({ id: 'es-lightning', topic: 'estimation', diff: 3, mins: 7,
    title: 'Powering a house with lightning',
    q: R`Estimate the energy in a lightning bolt. How long could it power a house? Why don't we harvest lightning?`,
    hints: [
      R`Charge transferred is about 15 C, and the potential difference is about $10^8$–$10^9$ V.`,
      R`A UK house uses about 8–10 kWh of electricity per day.`
    ],
    sol: R`$E \approx QV \approx 15\times5\times10^8\approx 10^{10}$ J (most estimates give $10^9$–$10^{10}$ J), about <b>300–3000 kWh</b>. Enough for a house for about <b>1–12 months</b>.

Why not harvest it? It's unpredictable in time and place, a strike lasts only about 100 μs, so the power ($\sim10^{13}$ W) is impossible to absorb without destroying the equipment, much of the energy goes into heating and expanding the air (thunder) along a km-long channel rather than reaching the ground, and the average energy per site per year is tiny.`,
    insight: R`Order-of-magnitude reasoning with honest uncertainty ranges, then a practical engineering critique (power vs energy).`,
    follow: R`Compare the energy of a lightning bolt with a litre of petrol (about 34 MJ). Surprised?`
  });

  Q({ id: 'es-car-fuel', topic: 'estimation', diff: 4, mins: 10,
    title: 'Fuel consumption from first principles',
    q: R`Estimate the fuel consumption (litres per 100 km) of a typical car on the motorway at 70 mph, from first principles.`,
    hints: [
      R`Drag force $\tfrac12\rho C_DAv^2$ with $C_D\approx0.3$, $A\approx2.2$ m², $v\approx31$ m/s.`,
      R`Rolling resistance: $C_{rr}mg$ with $C_{rr}\approx0.01$ and $m\approx1500$ kg.`,
      R`Engine efficiency about 25%, and petrol is about 34 MJ/L.`
    ],
    sol: R`Drag: $0.5\times1.2\times0.3\times2.2\times31^2\approx 380$ N. Rolling: $0.01\times1500\times9.8\approx 150$ N. Total ≈ 530 N.

Work over 100 km: $530\times10^5\approx 53$ MJ. Fuel energy: $53/0.25\approx 210$ MJ, so $210/34\approx$ <b>6 L/100 km</b> (about 47 mpg). That's very close to real-world figures.

Drag dominates at motorway speeds and scales as $v^2$: driving at 60 instead of 70 mph cuts drag by about 27%.`,
    insight: R`A complete Fermi chain from physics to an everyday number, checked against reality. Interviewers love seeing that click.`,
    follow: R`Why is city driving less efficient despite lower speeds? (Braking wastes kinetic energy, and the engine runs at poor efficiency.)`
  });

  Q({ id: 'es-sea-level', topic: 'estimation', diff: 3, mins: 7,
    title: 'Sea level if Antarctica melted',
    q: R`Estimate how much sea level would rise if all the Antarctic ice sheet melted. State your assumptions.`,
    hints: [
      R`Antarctica's area is about 14 million km², with an average ice thickness of about 2 km.`,
      R`The oceans cover about 70% of Earth's surface (about $3.6\times10^8$ km²).`
    ],
    sol: R`Ice volume: $1.4\times10^7\times2\approx 2.8\times10^7$ km³. As water (×0.9): $2.5\times10^7$ km³.

Rise $\approx\dfrac{2.5\times10^7}{3.6\times10^8}\approx 0.07$ km $\approx$ <b>70 m</b>.

Refinements: some ice already sits below sea level (so it already displaces water), the coastline would move inland (increasing the ocean area), and the land would rebound once unloaded. The scientific estimate is about 58 m.`,
    insight: R`State assumptions, then critique them. "My estimate is X; real effects that change it are Y and Z" is ideal.`,
    follow: R`Greenland holds about 7 m of sea level. Why is West Antarctica considered the most worrying part?`
  });

  /* ───────────── MOTIVATION & WIDER ENGINEERING ───────────── */

  Q({ id: 'pe-why', topic: 'personal', diff: 3, mins: 5,
    title: 'Why Engineering at Cambridge?',
    q: R`"Why do you want to study Engineering, and why at Cambridge in particular?" Give a two-minute answer that would impress an engineering Director of Studies.`,
    hints: [
      R`Be specific: one concrete problem or moment that hooked you, beats general enthusiasm.`,
      R`Cambridge's course is <b>general</b> for two years before you specialise. Do you know why that suits you?`
    ],
    sol: R`<b>A strong structure:</b>

1. <b>A specific hook:</b> a real problem you engaged with deeply (a project, something you built, a book, a question that bugged you) and what you <i>did</i> about it.

2. <b>What you learned</b> about engineering from it: modelling, trade-offs, design under constraints, using maths to predict reality.

3. <b>Why Cambridge specifically:</b> the broad first two years (mechanical, electrical, structural, materials, information engineering) before you specialise, because good engineering problems cross disciplines. Also hands-on labs and projects, and small-group supervisions.

4. <b>Where you're heading</b> (optional, and honest): an area you're curious about, while staying open-minded.

<b>Avoid:</b> "I've always loved maths and physics" with nothing specific, quoting rankings, or reciting the prospectus. Keep it under two minutes and be ready for "tell me more about that project".`,
    insight: R`The interview is mostly academic. This question is often a warm-up, so make it short, specific and honest, and leave hooks the interviewer can pick up.`,
    follow: R`"What's the hardest part of that project you mentioned, and what would you do differently?"`
  });

  Q({ id: 'pe-object', topic: 'personal', diff: 4, mins: 8,
    title: 'Explain an engineered object',
    q: R`"Pick an everyday engineered object you find interesting and tell me about the engineering decisions behind it." Prepare one in depth. For example: a bicycle, a zip, a microwave oven, a suspension bridge, a USB charger, a drinks can.`,
    hints: [
      R`Structure: function → physical principles → key design trade-offs → failure modes → how you'd improve it.`,
      R`Include at least one quantitative estimate.`
    ],
    sol: R`<b>Example: aluminium drinks can.</b>
• <b>Function:</b> contain a pressurised liquid (up to about 6 bar), cheaply, in their billions.
• <b>Principles:</b> thin-walled pressure vessel. The hoop stress $pr/t$ with $r = 33$ mm and $t\approx0.1$ mm gives $\sigma\approx 200$ MPa, close to the alloy's strength. The pressure itself stiffens the can (an unopened can is hard to crush).
• <b>Trade-offs:</b> the domed base resists pressure without extra thickness; the necked top reduces the lid's size (lids are thicker and more expensive); walls are made by drawing and ironing, which work-hardens the aluminium.
• <b>Failure modes:</b> axial buckling once opened (no pressure), and corrosion (hence the internal polymer lining).
• <b>Improvement:</b> lighter alloys, or recycled content (recycling saves about 95% of the energy).

Being able to talk like this about <i>any</i> object you mention is what interviewers look for.`,
    insight: R`Show you see engineering everywhere. Combine physics, numbers and trade-offs, not just a description.`,
    follow: R`"If you had to make it 20% lighter, what would you change and what would you risk?"`
  });

  Q({ id: 'pe-ps-deep', topic: 'personal', diff: 4, mins: 8,
    title: 'Defend your personal statement',
    q: R`Interviewers often take a topic from your personal statement and push it two levels deeper than school. Pick the most technical claim in yours (a book, project or concept) and answer: "Explain the key idea from first principles. What are its limitations? What's an open problem in that area?"`,
    hints: [
      R`For each item in your statement, prepare: a 30-second summary, a derivation or quantitative example, two limitations, and one connection to something else.`,
      R`If you mention a book, know its central argument and one thing you disagreed with.`
    ],
    sol: R`<b>Preparation method</b> (for each item on your personal statement):

1. <b>Explain it to a 12-year-old</b> in 30 seconds.
2. <b>Explain it to an engineer:</b> the governing equation or principle, with a numerical example (e.g. for a wind turbine: $P = \tfrac12\rho Av^3C_p$, the Betz limit, and an estimate for a real turbine).
3. <b>Limitations:</b> where the simple model breaks down.
4. <b>Connections:</b> an analogous problem in another field.
5. <b>Critique:</b> what you'd do differently, or what you disagree with.

If you can't do all five for something, either learn it properly or remove it from your statement. Interviewers see bluffing straight away and will happily dig until you hit the edge of your knowledge. That's fine, provided you then reason honestly from what you do know.`,
    insight: R`Saying "I don't know, but I'd approach it like this…" is a strong answer. Bluffing is the weakest.`,
    follow: R`"That's the textbook model. What does it ignore, and does that matter?"`
  });

  Q({ id: 'pe-ethics', topic: 'personal', diff: 4, mins: 8,
    title: 'Engineering and society',
    q: R`"Engineers designed the internal combustion engine, which has caused enormous harm through climate change. Are engineers responsible for how their inventions are used?" Discuss, and give an example of an engineering decision with an ethical trade-off.`,
    hints: [
      R`Consider foreseeability, alternatives available at the time, and professional codes (e.g. the Engineering Council's statement of ethical principles).`,
      R`A concrete example helps: self-driving car decisions, the Grenfell cladding, the Boeing 737 MAX MCAS, or nuclear power.`
    ],
    sol: R`<b>A balanced structure:</b>

• <b>Engineers have real responsibility</b> for safety, honesty about risk, and foreseeable harms. Professional codes put public welfare first. The 737 MAX (a single-sensor design decision with inadequate disclosure) and Grenfell (combustible cladding, regulatory failures) show the consequences when this fails.

• <b>Responsibility is shared</b> with clients, regulators, markets and users. Early car engineers couldn't reasonably foresee climate change; today's engineers can, so today's responsibility is greater.

• <b>Trade-off example:</b> nuclear power. Very low carbon emissions and an excellent safety record per TWh, against waste storage, accident perceptions and cost. A good answer weighs evidence and doesn't just assert a view.

• <b>Conclusion:</b> engineers can't control all uses, but they must anticipate, disclose and design for safety and sustainability. Today that includes whole-life carbon.`,
    insight: R`Show balanced, evidence-based reasoning. There's no "right" answer. Interviewers assess clarity and nuance.`,
    follow: R`"Should a self-driving car prioritise its passenger or pedestrians? Who should decide?"`
  });
})();
