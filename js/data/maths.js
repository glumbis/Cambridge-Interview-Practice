/* Question bank: Calculus & DEs, Algebra & Graphs, Geometry, Probability & Logic. */
(() => {
  const R = String.raw;
  const Q = (o) => window.QB.push(o);
  window.QB = window.QB || [];

  /* ───────────── CALCULUS & DIFFERENTIAL EQUATIONS ───────────── */

  Q({ id: 'ca-epi', topic: 'calculus', diff: 4, mins: 8,
    title: 'Which is bigger: e^π or π^e?',
    q: R`Without a calculator, decide which is larger: $e^\pi$ or $\pi^e$. Prove it.`,
    hints: [
      R`Take logarithms. Compare $\pi\ln e$ with $e\ln\pi$, or equivalently $\dfrac{\ln e}{e}$ with $\dfrac{\ln\pi}{\pi}$.`,
      R`Study the function $f(x) = \dfrac{\ln x}{x}$. Where is its maximum?`
    ],
    sol: R`Let $f(x) = \dfrac{\ln x}{x}$. Then $f'(x) = \dfrac{1-\ln x}{x^2}$, which is zero at $x = e$, positive before and negative after, so $x = e$ is the global maximum.

So $f(\pi) < f(e)$: $\;\dfrac{\ln\pi}{\pi} < \dfrac1e \Rightarrow e\ln\pi < \pi \Rightarrow \pi^e < e^\pi$.

(Numerically, $e^\pi \approx 23.14$ and $\pi^e \approx 22.46$.)`,
    insight: R`Turn "compare two numbers" into "compare one function at two points". Differentiating $\ln x/x$ is the whole trick.`,
    follow: R`Find all pairs of distinct positive integers with $a^b = b^a$. (Only $2^4 = 4^2$. Why does the analysis of $f$ show this?)`
  });

  Q({ id: 'ca-gaussian', topic: 'calculus', diff: 5, mins: 12,
    title: 'The Gaussian integral',
    q: R`Evaluate $\displaystyle I = \int_0^\infty e^{-x^2}\,dx$. (There is no elementary antiderivative.)`,
    hints: [
      R`Consider $I^2 = \int_0^\infty\!\int_0^\infty e^{-(x^2+y^2)}\,dx\,dy$.`,
      R`Switch to polar coordinates over the first quadrant: $dx\,dy = r\,dr\,d\theta$.`
    ],
    sol: R`$$I^2 = \int_0^{\pi/2}\!\!\int_0^\infty e^{-r^2}r\,dr\,d\theta = \frac{\pi}{2}\left[-\tfrac12 e^{-r^2}\right]_0^\infty = \frac{\pi}{4}.$$
So $I = \dfrac{\sqrt\pi}{2}$.`,
    insight: R`Squaring an integral to make it two-dimensional, then using symmetry. The extra factor $r$ from polar coordinates is exactly what makes $e^{-r^2}$ integrable.`,
    follow: R`Hence evaluate $\int_{-\infty}^{\infty}x^2e^{-x^2}\,dx$. (Integrate by parts, or differentiate $\int e^{-ax^2}dx = \sqrt{\pi/a}$ with respect to $a$.)`
  });

  Q({ id: 'ca-symmetry', topic: 'calculus', diff: 4, mins: 8,
    title: 'Integral by symmetry',
    q: R`Evaluate $\displaystyle\int_0^{\pi/2}\frac{\sin x}{\sin x + \cos x}\,dx$.`,
    hints: [
      R`Substitute $u = \tfrac\pi2 - x$. What does the integral become?`,
      R`Add the original and the transformed integrals.`
    ],
    sol: R`With $u = \tfrac\pi2 - x$, $\sin x \leftrightarrow \cos u$, so
$$I = \int_0^{\pi/2}\frac{\cos u}{\cos u + \sin u}\,du.$$
Adding: $2I = \int_0^{\pi/2}1\,dx = \tfrac\pi2$, so $I = \dfrac{\pi}{4}$.`,
    insight: R`The "King's rule" substitution $x \to a + b - x$ on $[a,b]$ is the trick for integrals that look impossible but have symmetric limits.`,
    follow: R`Use the same trick on $\int_0^{\pi/2}\dfrac{\sin^n x}{\sin^n x+\cos^n x}\,dx$. Does $n$ matter?`
  });

  Q({ id: 'ca-tank', topic: 'calculus', diff: 4, mins: 12,
    title: 'Salt tank that fills up',
    q: R`A tank holds 1000 L of pure water. Brine containing 0.05 kg of salt per litre flows in at 10 L/min, and the well-mixed liquid flows out at 10 L/min.

(a) Find the mass of salt $m(t)$.

(b) Now the outflow is only 5 L/min, so the tank fills up. Find $m(t)$ again.`,
    hints: [
      R`Rate in minus rate out. Rate out = (outflow rate) × (concentration $m/V$).`,
      R`(a) is a separable linear ODE. For (b), $V = 1000 + 5t$ and you need an integrating factor.`,
      R`For (b), $m' + \dfrac{m}{200+t} = 0.5$. Multiply through by $(200+t)$.`
    ],
    sol: R`<b>(a)</b> $\dfrac{dm}{dt} = 0.5 - \dfrac{10m}{1000} \Rightarrow m = 50\left(1 - e^{-t/100}\right)$ kg. It approaches 50 kg, the concentration of the brine times the volume. ✓

<b>(b)</b> $\dfrac{dm}{dt} = 0.5 - \dfrac{5m}{1000 + 5t} = 0.5 - \dfrac{m}{200+t}$. Multiplying by $(200+t)$:
$$\frac{d}{dt}\big[m(200+t)\big] = 0.5(200+t) \;\Rightarrow\; m(200+t) = 0.25(200+t)^2 + C.$$
With $m(0) = 0$, $C = -10\,000$:
$$m = 0.25\left[(200+t) - \frac{40\,000}{200+t}\right].$$
The concentration $m/V$ approaches 0.05 kg/L as $t\to\infty$. ✓`,
    insight: R`Always sanity-check the long-term limit against physical intuition (the concentration must approach the inflow concentration).`,
    follow: R`How long until the concentration in (b) reaches 90% of the inflow value? Compare with (a).`
  });

  Q({ id: 'ca-coffee', topic: 'calculus', diff: 4, mins: 10,
    title: 'Milk now or milk later?',
    q: R`You want your coffee as hot as possible when you drink it in 10 minutes. Should you add the cold milk now or just before drinking? Model it with Newton's law of cooling, $\dot T = -k(T - T_a)$, and prove your answer. Does it matter whether the milk is from the fridge or at room temperature?`,
    hints: [
      R`Mixing is a weighted average: $T_\text{mix} = pT_c + qT_m$ with $p + q = 1$.`,
      R`Under Newton's law, the excess temperature $T - T_a$ decays as $e^{-kt}$.`,
      R`Compute both options and subtract.`
    ],
    sol: R`Let $\epsilon = e^{-kt}$. Then:

<b>Milk first:</b> $T_A = T_a + (pT_c + qT_m - T_a)\epsilon$.

<b>Milk later:</b> $T_B = p[T_a + (T_c - T_a)\epsilon] + qT_m$.

Subtracting: $T_A - T_B = q(T_a - T_m)(1 - \epsilon)$.

If the milk is colder than the room ($T_m < T_a$), $T_A > T_B$: <b>add the milk now</b>. If the milk is at room temperature, Newton's law says <b>it makes no difference</b>. The advantage comes entirely from the cold milk warming up when it's in the cup, whereas in the fridge it stays cold.

In reality, heat loss grows faster than linearly with temperature (radiation $\propto T^4$, and evaporation), so hotter coffee loses heat disproportionately. That is a second reason to add the milk first.`,
    insight: R`A clean algebraic result can overturn the "obvious" explanation. Interviewers love it when you find which assumption the answer depends on.`,
    follow: R`If the milk is left out on the counter instead of the fridge, what happens? And what if the cup is thin-walled metal rather than ceramic?`
  });

  Q({ id: 'ca-toilet-roll', topic: 'calculus', diff: 3, mins: 7,
    title: 'Toilet roll',
    q: R`A roll of paper has outer radius $R$, core radius $r$ and paper thickness $t$. (a) Estimate the total length of paper. (b) If you pull paper off at constant speed $v$, how fast does the radius decrease, and how does the roll's spin rate change?`,
    hints: [
      R`The paper's side-on cross-section has area $\pi(R^2-r^2) \approx L\,t$.`,
      R`Differentiate the area relation with respect to time.`
    ],
    sol: R`<b>(a)</b> $L = \dfrac{\pi(R^2 - r^2)}{t}$. For example, $R = 5.5$ cm, $r = 2$ cm, $t = 0.1$ mm gives $L \approx 82$ m.

<b>(b)</b> $\dfrac{d}{dt}(\pi\rho^2) = -vt \Rightarrow \dfrac{d\rho}{dt} = -\dfrac{vt}{2\pi\rho}$. The radius shrinks faster as the roll gets smaller. Spin rate $\omega = v/\rho$ increases as the roll empties, and the angular acceleration $\dot\omega = -v\dot\rho/\rho^2 = \dfrac{v^2t}{2\pi\rho^3}$ blows up near the core. That's why rolls spin away wildly at the end.`,
    insight: R`Conserve something (area) instead of summing a spiral. The approximation works because $t \ll R$.`,
    follow: R`How would you measure $t$ without a micrometer? (Count turns, or measure the roll's radius and the length.)`
  });

  Q({ id: 'ca-can', topic: 'calculus', diff: 3, mins: 8,
    title: 'Optimal can',
    q: R`A cylindrical can must hold volume $V$. Find the shape (ratio $h/r$) that uses the least metal. Real drink cans are much taller than this. Suggest why, and show how one realistic change to the model changes the optimum.`,
    hints: [
      R`$S = 2\pi r^2 + 2\pi r h$ with $h = V/(\pi r^2)$.`,
      R`Make the ends $k$ times thicker than the side (they're stamped and must resist pressure).`
    ],
    sol: R`$S = 2\pi r^2 + \dfrac{2V}{r}$, and $S' = 4\pi r - \dfrac{2V}{r^2} = 0 \Rightarrow V = 2\pi r^3 \Rightarrow h = 2r$. The height equals the diameter.

If the ends are $k$ times thicker, the metal used is $\propto 2k\pi r^2 + 2V/r$, so $V = 2k\pi r^3$ and $h = 2kr$. With $k \approx 3$ you get $h/d \approx 3$, much more like a real can.

Other real factors: ergonomics (holding it in a hand), the tapered top, stacking and packing, and the cost of the seam and lid rather than just the metal.`,
    insight: R`Solve the textbook model, then challenge an assumption. That second step is what Cambridge interviewers are actually testing.`,
    follow: R`Which shape minimises surface area for a fixed volume with no constraints at all? Why don't we make cans like that?`
  });

  Q({ id: 'ca-lifeguard', topic: 'calculus', diff: 4, mins: 10,
    title: 'The lifeguard problem',
    q: R`A lifeguard on the beach sees a swimmer in trouble. They can run at $v_1$ on sand and swim at $v_2 < v_1$. The shoreline is straight. Show that the fastest route crosses the shoreline at a point where $\dfrac{\sin\theta_1}{v_1} = \dfrac{\sin\theta_2}{v_2}$, with the angles measured from the normal to the shore.`,
    hints: [
      R`Put the lifeguard at $(0, -a)$, the swimmer at $(d, b)$ and the crossing point at $(x, 0)$.`,
      R`$T(x) = \dfrac{\sqrt{a^2+x^2}}{v_1} + \dfrac{\sqrt{b^2+(d-x)^2}}{v_2}$. Set $T'(x) = 0$.`
    ],
    sol: R`$$T'(x) = \frac{x}{v_1\sqrt{a^2+x^2}} - \frac{d-x}{v_2\sqrt{b^2+(d-x)^2}} = 0.$$
The fractions are $\sin\theta_1$ and $\sin\theta_2$, giving $\dfrac{\sin\theta_1}{v_1} = \dfrac{\sin\theta_2}{v_2}$. This is <b>Snell's law</b>: light refracts because it takes the quickest path (Fermat's principle). $T''>0$, so it's a minimum.`,
    insight: R`Spotting the link between optimisation and physics (refraction) earns big marks. Show it's a minimum, not just a stationary point.`,
    follow: R`Is the lifeguard's straight-line route ever optimal? What about running along the shore first, then swimming straight out?`
  });

  Q({ id: 'ca-torus', topic: 'calculus', diff: 4, mins: 10,
    title: 'Icing a doughnut',
    q: R`A ring doughnut is a torus: a circle of radius $r$ swept around an axis at distance $R$ from the circle's centre ($R > r$). Find its volume and surface area (the area you'd need to ice). Justify the method.`,
    hints: [
      R`Pappus' theorem: volume = (area of cross-section) × (distance travelled by its centroid).`,
      R`To verify, slice the torus with planes perpendicular to the axis: each slice is a washer.`
    ],
    sol: R`Pappus: $V = \pi r^2 \cdot 2\pi R = 2\pi^2Rr^2$, and $S = 2\pi r\cdot 2\pi R = 4\pi^2Rr$.

Check by washers: at height $z$, the inner and outer radii are $R \mp \sqrt{r^2-z^2}$, so the washer area is $4\pi R\sqrt{r^2-z^2}$, and
$$V = 4\pi R\int_{-r}^{r}\sqrt{r^2-z^2}\,dz = 4\pi R\cdot\tfrac{\pi r^2}{2} = 2\pi^2Rr^2. \checkmark$$`,
    insight: R`Know Pappus, but be ready to prove it by direct integration. The washer area comes out linear in $R$, which is why it works.`,
    follow: R`If you only ice the top half, is the iced area exactly half? (No: the outer half has more area than the inner half. Compute the split.)`
  });

  Q({ id: 'ca-series', topic: 'calculus', diff: 4, mins: 8,
    title: 'Summing n/2^n',
    q: R`Evaluate $\displaystyle\sum_{n=1}^{\infty}\frac{n}{2^n}$. Then find $\displaystyle\sum_{n=1}^\infty\frac{n^2}{2^n}$.`,
    hints: [
      R`Start from $\sum x^n = \dfrac{1}{1-x}$ for $|x|<1$.`,
      R`Differentiate and multiply by $x$: $\sum nx^n = \dfrac{x}{(1-x)^2}$.`
    ],
    sol: R`$\sum nx^n = \dfrac{x}{(1-x)^2}$. At $x = \tfrac12$: $\dfrac{1/2}{1/4} = 2$.

Applying $x\dfrac{d}{dx}$ again: $\sum n^2x^n = \dfrac{x(1+x)}{(1-x)^3}$. At $x = \tfrac12$: $\dfrac{\tfrac12\cdot\tfrac32}{\tfrac18} = 6$.

There's also a neat alternative for the first: $S - \tfrac12 S = \tfrac12 + \tfrac14 + \dots = 1$, so $S = 2$.`,
    insight: R`Differentiating a known series is a powerful general tool. The "subtract a shifted copy" trick is quicker for the first part.`,
    follow: R`Interpret $\sum n/2^n$ as an expected value: the expected number of fair coin flips needed to get the first head.`
  });

  Q({ id: 'ca-leibniz', topic: 'calculus', diff: 4, mins: 10,
    title: 'π from arctan',
    q: R`Show that $\dfrac{d}{dx}\arctan x = \dfrac{1}{1+x^2}$. Hence prove that $\dfrac{\pi}{4} = 1 - \dfrac13 + \dfrac15 - \dfrac17 + \cdots$.`,
    hints: [
      R`Let $y = \arctan x$, so $x = \tan y$. Differentiate implicitly.`,
      R`Expand $\dfrac{1}{1+x^2}$ as a geometric series and integrate term by term from 0 to 1.`
    ],
    sol: R`$x = \tan y \Rightarrow 1 = \sec^2y\,\dfrac{dy}{dx} \Rightarrow \dfrac{dy}{dx} = \dfrac{1}{1+\tan^2 y} = \dfrac{1}{1+x^2}$.

$\dfrac{1}{1+x^2} = 1 - x^2 + x^4 - \dots$, so integrating from 0 to 1:
$$\arctan 1 = \frac\pi4 = 1 - \frac13 + \frac15 - \cdots$$
(The series converges at $x = 1$ only conditionally. Rigorously, use the finite geometric sum plus a remainder term $\int_0^1 \frac{x^{2n}}{1+x^2}dx \le \frac{1}{2n+1} \to 0$.)`,
    insight: R`Inverse function differentiation and series manipulation. Mentioning the convergence subtlety at the endpoint shows maturity.`,
    follow: R`This series converges very slowly. How many terms do you need for 3 decimal places? Can you think of a faster series for π?`
  });

  Q({ id: 'ca-frightening', topic: 'calculus', diff: 5, mins: 14,
    title: 'A frightening integral',
    q: R`Evaluate $\displaystyle I = \int_0^\pi\frac{x\sin x}{1+\cos^2x}\,dx$.`,
    hints: [
      R`The $x$ factor is the problem. Try $x \to \pi - x$.`,
      R`You'll get $I = \dfrac{\pi}{2}\displaystyle\int_0^\pi\frac{\sin x}{1+\cos^2 x}\,dx$.`,
      R`Substitute $u = \cos x$.`
    ],
    sol: R`With $x \to \pi - x$: $\sin x$ and $\cos^2x$ are unchanged, so
$$I = \int_0^\pi\frac{(\pi - x)\sin x}{1+\cos^2x}\,dx = \pi J - I, \quad J = \int_0^\pi\frac{\sin x}{1+\cos^2x}\,dx.$$
With $u = \cos x$: $J = \int_{-1}^{1}\dfrac{du}{1+u^2} = \tfrac\pi4 + \tfrac\pi4 = \tfrac\pi2$. So
$$I = \frac{\pi}{2}J = \frac{\pi^2}{4}.$$`,
    insight: R`When an $x$ multiplies something symmetric about the midpoint, reflection removes it. Recognise $\frac{1}{1+u^2}$ as the derivative of arctan.`,
    follow: R`Use the same idea to show $\int_0^\pi x\sin^2x\,dx = \pi^2/4$ as well. Coincidence?`
  });

  Q({ id: 'ca-torricelli', topic: 'calculus', diff: 4, mins: 10,
    title: 'Draining a tank, and a water clock',
    q: R`A cylindrical tank of cross-section $A$ has water to depth $H$, draining through a small hole of area $a$ in the base. (a) How long does it take to empty? (b) The ancient Egyptians wanted a water clock whose level falls at a <b>constant</b> rate. What shape should the vessel be?`,
    hints: [
      R`Torricelli: the outflow speed is $\sqrt{2gh}$ (from Bernoulli).`,
      R`$A\,\dfrac{dh}{dt} = -a\sqrt{2gh}$.`,
      R`For (b), make the cross-sectional area $A(h)$ a function such that $dh/dt$ is constant.`
    ],
    sol: R`<b>(a)</b> $\dfrac{dh}{\sqrt h} = -\dfrac{a}{A}\sqrt{2g}\,dt \Rightarrow 2\sqrt H = \dfrac{a}{A}\sqrt{2g}\,T \Rightarrow T = \dfrac{A}{a}\sqrt{\dfrac{2H}{g}}$.

Note the level falls fastest at the start. The last half of the depth takes about 71% of the time.

<b>(b)</b> $A(h)\dfrac{dh}{dt} = -a\sqrt{2gh}$ with $dh/dt$ constant needs $A \propto \sqrt h$. For a vessel of revolution, $\pi r^2 \propto h^{1/2}$, so $r \propto h^{1/4}$: a quartic-profile bowl, narrow at the bottom and flaring out.`,
    insight: R`Set up a rate equation from conservation of volume, then turn the problem round (inverse design) for part (b).`,
    follow: R`Real holes have a "discharge coefficient" of about 0.6 because the jet contracts (the vena contracta). How does that change $T$?`
  });

  Q({ id: 'ca-substitution', topic: 'calculus', diff: 4, mins: 9,
    title: 'Nasty differential equation',
    q: R`Solve $\dfrac{dy}{dx} = (x + y)^2$ with $y(0) = 0$. For what $x$ does the solution exist?`,
    hints: [
      R`It isn't separable as written. Substitute $u = x + y$.`,
      R`$u' = 1 + y' = 1 + u^2$.`
    ],
    sol: R`With $u = x + y$: $\dfrac{du}{dx} = 1 + u^2 \Rightarrow \arctan u = x + C$. Since $u(0) = 0$, $C = 0$, so $u = \tan x$ and
$$y = \tan x - x.$$
The solution blows up at $x = \pm\pi/2$, so it exists only for $|x| < \pi/2$, even though the equation looks perfectly smooth everywhere.`,
    insight: R`If the right-hand side depends on a combination like $x+y$ or $y/x$, substitute it. Nonlinear ODEs can blow up in finite time, which is worth pointing out.`,
    follow: R`Solve $y' = y/x + x$ similarly (try $u = y/x$, or an integrating factor).`
  });

  Q({ id: 'ca-parts', topic: 'calculus', diff: 3, mins: 7,
    title: 'Double integration by parts',
    q: R`Find $\displaystyle\int e^x\sin x\,dx$. Then evaluate $\displaystyle\int_0^\infty e^{-x}\sin x\,dx$ and explain the result physically, as a damped oscillation.`,
    hints: [
      R`Integrate by parts twice. The original integral reappears on the right-hand side.`,
      R`Or write $\sin x = \text{Im}\,e^{ix}$ and integrate $e^{(1+i)x}$.`
    ],
    sol: R`Let $I = \int e^x\sin x\,dx = e^x\sin x - \int e^x\cos x\,dx = e^x\sin x - e^x\cos x - I$, so
$$I = \tfrac12 e^x(\sin x - \cos x) + C.$$
Similarly $\int_0^\infty e^{-x}\sin x\,dx = \left[-\tfrac12 e^{-x}(\sin x + \cos x)\right]_0^\infty = \tfrac12$.

Complex route: $\text{Im}\displaystyle\int_0^\infty e^{(-1+i)x}dx = \text{Im}\frac{1}{1-i} = \text{Im}\frac{1+i}{2} = \tfrac12$. ✓ The positive lobes outweigh the negative ones because each lobe is smaller than the last.`,
    insight: R`"The integral comes back" is a standard trick. The complex-exponential route is faster and links directly to AC circuits and oscillations.`,
    follow: R`Find $\int_0^\infty e^{-ax}\cos(bx)\,dx$ in general.`
  });

  Q({ id: 'ca-first-principles', topic: 'calculus', diff: 3, mins: 8,
    title: 'Derivative of sin from first principles',
    q: R`Prove from first principles that $\dfrac{d}{dx}\sin x = \cos x$. Along the way, justify that $\displaystyle\lim_{h\to0}\frac{\sin h}{h} = 1$ geometrically. Why must $x$ be in radians?`,
    hints: [
      R`$\sin(x+h) - \sin x = \sin x(\cos h - 1) + \cos x\sin h$.`,
      R`For the limit, compare areas in a unit circle: triangle ≤ sector ≤ larger triangle.`
    ],
    sol: R`$$\frac{\sin(x+h)-\sin x}{h} = \sin x\cdot\frac{\cos h - 1}{h} + \cos x\cdot\frac{\sin h}{h}.$$
Geometry (unit circle, angle $h$): $\tfrac12\sin h \le \tfrac12 h \le \tfrac12\tan h$, so $\cos h \le \dfrac{\sin h}{h} \le 1$, and squeezing gives the limit 1.

Then $\dfrac{\cos h - 1}{h} = -\dfrac{2\sin^2(h/2)}{h} = -\sin(h/2)\cdot\dfrac{\sin(h/2)}{h/2} \to 0$. Hence the derivative is $\cos x$.

Radians are needed because the sector area $\tfrac12 h$ (arc length = $h$) holds only when $h$ is in radians. In degrees, the derivative would be $\tfrac{\pi}{180}\cos x$.`,
    insight: R`Interviewers check you understand where results come from. The squeeze theorem with areas is the standard proof. Know it.`,
    follow: R`Use $\sin h \approx h$ to estimate the height of a mountain from the angle it subtends.`
  });

  /* ───────────── ALGEBRA, FUNCTIONS & GRAPHS ───────────── */

  Q({ id: 'al-sinln', topic: 'algebra', diff: 4, mins: 9,
    title: 'Sketch y = sin(ln x)',
    q: R`Sketch $y = \sin(\ln x)$ for $x > 0$. Find all the turning points and classify them. What happens as $x \to 0^+$ and as $x\to\infty$?`,
    hints: [
      R`Substitute $u = \ln x$. As $x$ goes from 0 to ∞, $u$ goes from $-\infty$ to $\infty$.`,
      R`$y' = \dfrac{\cos(\ln x)}{x}$.`
    ],
    sol: R`It's a sine wave in $u = \ln x$, so on the $x$-axis the oscillations get compressed towards 0 and stretched out for large $x$.

Turning points: $\cos(\ln x) = 0 \Rightarrow x = e^{\pi/2 + n\pi}$. Maxima ($y = 1$) at $x = e^{\pi/2 + 2n\pi}$ and minima ($y = -1$) at $x = e^{3\pi/2 + 2n\pi}$, for all integers $n$.

As $x \to 0^+$: infinitely many oscillations between $\pm1$, with no limit. As $x \to \infty$: oscillations get ever longer (successive zeros are a factor $e^\pi \approx 23$ apart). It passes through $(1, 0)$ with gradient 1.`,
    insight: R`For compositions, sketch in the inner variable first, then think about how the axis is distorted. Spot that the gaps between turning points grow geometrically.`,
    follow: R`Now sketch $y = x\sin(\ln x)$. Is it continuous at 0 if we define $y(0) = 0$? Is it differentiable there?`
  });

  Q({ id: 'al-x1x', topic: 'algebra', diff: 4, mins: 9,
    title: 'Sketch y = x^(1/x)',
    q: R`Sketch $y = x^{1/x}$ for $x > 0$. Hence decide which is bigger: $\pi^{1/\pi}$ or $e^{1/e}$? And $2^{1/2}$ or $4^{1/4}$?`,
    hints: [
      R`Take logs: $\ln y = \dfrac{\ln x}{x}$.`,
      R`Find the limits as $x \to 0^+$ and $x\to\infty$.`
    ],
    sol: R`$\ln y = \ln x/x$, so $\dfrac{y'}{y} = \dfrac{1-\ln x}{x^2}$, and the maximum is at $x = e$ with $y = e^{1/e} \approx 1.444$.

As $x\to0^+$: $\ln x/x \to -\infty$, so $y\to0$. As $x\to\infty$: $\ln x/x\to0$, so $y\to1^+$. The curve rises from 0, crosses $y = 1$ at $x = 1$, peaks at $(e, e^{1/e})$, then decays towards $y = 1$ from above.

So $e^{1/e} > \pi^{1/\pi}$, and $2^{1/2} = 4^{1/4}$ exactly, since $4^{1/4} = (2^2)^{1/4}$. (These two points on opposite sides of the peak have the same height.)`,
    insight: R`Logarithmic differentiation handles any variable exponent. Use the sketch to answer comparison questions.`,
    follow: R`For which $a$ does the infinite power tower $a^{a^{a^{\cdots}}}$ converge? (For $e^{-e} \le a \le e^{1/e}$, a lovely link to this curve.)`
  });

  Q({ id: 'al-rational', topic: 'algebra', diff: 4, mins: 10,
    title: 'Sketch a rational function and its square root',
    q: R`Sketch $y = \dfrac{x^2-1}{x^2-4}$, showing all asymptotes, intercepts and turning points. Then sketch $y^2 = \dfrac{x^2-1}{x^2-4}$.`,
    hints: [
      R`Even function. Vertical asymptotes at $x = \pm2$, horizontal asymptote $y = 1$.`,
      R`Write $y = 1 + \dfrac{3}{x^2-4}$. That makes the shape obvious.`,
      R`For $y^2 = f$, you need $f \ge 0$, symmetry in the $x$-axis, and vertical tangents where $f = 0$.`
    ],
    sol: R`$y = 1 + \dfrac{3}{x^2 - 4}$. Zeros at $x = \pm1$, $y(0) = \tfrac14$, and $y' = \dfrac{-6x}{(x^2-4)^2}$, so there's a single turning point, a <b>maximum</b> at $(0, \tfrac14)$. For $|x|<2$ the curve lies below 1 and drops to $-\infty$ at $x = \pm2$. For $|x|>2$, $y > 1$, coming down from $+\infty$ towards the asymptote $y = 1$.

For $y^2 = f$: the curve exists only where $f\ge0$, i.e. $|x|\le1$ or $|x|>2$. In the middle there's a closed oval through $(0,\pm\tfrac12)$ and $(\pm1, 0)$, with vertical tangents at $x = \pm1$. Outside, four branches come from $\pm\infty$ near $x = \pm2$ and approach $y = \pm1$.`,
    insight: R`Rewriting as "1 + something" reveals the asymptote and how the curve approaches it. For $y^2 = f(x)$: take $\pm\sqrt{f}$ and note vertical tangents at simple roots.`,
    follow: R`Sketch $y = e^{f(x)}$ and $y = 1/f(x)$ for the same $f$.`
  });

  Q({ id: 'al-nested-roots', topic: 'algebra', diff: 3, mins: 7,
    title: 'Nested square roots',
    q: R`Evaluate $\sqrt{2 + \sqrt{2 + \sqrt{2 + \cdots}}}$. For which positive integers $a$ is $\sqrt{a + \sqrt{a + \cdots}}$ an integer? Can you justify that the infinite expression converges?`,
    hints: [
      R`If it converges to $L$, then $L = \sqrt{a + L}$.`,
      R`For convergence: the sequence $x_{n+1} = \sqrt{a + x_n}$ is increasing and bounded.`
    ],
    sol: R`$L^2 = a + L \Rightarrow L = \dfrac{1 + \sqrt{1 + 4a}}{2}$ (taking the positive root). For $a = 2$, $L = 2$.

$L$ is an integer exactly when $1 + 4a$ is an odd perfect square, i.e. $a = n(n+1)$: $a = 2, 6, 12, 20, \dots$ give $L = 2, 3, 4, 5, \dots$

Convergence: $x_1 = \sqrt a$. If $x_n < L$ then $x_{n+1} = \sqrt{a + x_n} < \sqrt{a+L} = L$, and $x_{n+1} > x_n$ whenever $x_n < L$. A bounded increasing sequence converges, and its limit satisfies the fixed-point equation.`,
    insight: R`Self-similarity gives the equation, but a rigorous answer also proves convergence. Mention it even if briefly.`,
    follow: R`Evaluate $\sqrt{2\sqrt{2\sqrt{2\cdots}}}$ and the continued fraction $1 + \dfrac{1}{1 + \dfrac{1}{1+\cdots}}$.`
  });

  Q({ id: 'al-irrational', topic: 'algebra', diff: 4, mins: 9,
    title: 'Irrational to an irrational power',
    q: R`Prove that $\sqrt2$ is irrational. Then prove there exist irrational numbers $a$ and $b$ such that $a^b$ is rational, without knowing whether $\sqrt2^{\sqrt2}$ is rational.`,
    hints: [
      R`Assume $\sqrt2 = p/q$ in lowest terms. Show both $p$ and $q$ are even.`,
      R`Consider $x = \sqrt2^{\sqrt2}$. Either it's rational, or it isn't. In the second case, consider $x^{\sqrt2}$.`
    ],
    sol: R`<b>√2:</b> If $\sqrt2 = p/q$ in lowest terms, $p^2 = 2q^2$, so $p$ is even. Write $p = 2k$: $q^2 = 2k^2$, so $q$ is even, which contradicts lowest terms.

<b>Existence:</b> Let $x = \sqrt2^{\sqrt2}$. If $x$ is rational, take $a = b = \sqrt2$. If $x$ is irrational, take $a = x$, $b = \sqrt2$: then $a^b = \sqrt2^{\sqrt2\cdot\sqrt2} = \sqrt2^2 = 2$. Either way, such a pair exists. (In fact $x$ is irrational and transcendental, by the Gelfond–Schneider theorem.)`,
    insight: R`Proof by contradiction, and a non-constructive proof by cases. Both are classic interview favourites for testing whether you understand logical structure.`,
    follow: R`Give a constructive example: $a = \sqrt2$, $b = \log_2 9$. Show $b$ is irrational and $a^b = 3$.`
  });

  Q({ id: 'al-ii', topic: 'algebra', diff: 4, mins: 8,
    title: 'What is i^i?',
    q: R`Compute $i^i$. Is it real? Is it unique?`,
    hints: [
      R`Write $i = e^{i\pi/2}$ using Euler's formula.`,
      R`But also $i = e^{i(\pi/2 + 2\pi n)}$ for any integer $n$.`
    ],
    sol: R`$i = e^{i\pi/2}$, so $i^i = e^{i\cdot i\pi/2} = e^{-\pi/2} \approx 0.208$. It's <b>real</b>.

Since $i = e^{i(\pi/2+2\pi n)}$, the general value is $e^{-\pi/2 - 2\pi n}$: infinitely many real values. Complex powers are multivalued, and $e^{-\pi/2}$ is the "principal value" (using the principal branch of the logarithm).`,
    insight: R`Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$ is essential. Pointing out the multivaluedness shows depth.`,
    follow: R`Solve $\cos z = 2$ for complex $z$.`
  });

  Q({ id: 'al-cos72', topic: 'algebra', diff: 5, mins: 12,
    title: 'Exact value of cos 72°',
    q: R`Find the exact value of $\cos\dfrac{2\pi}{5}$ using the fifth roots of unity.`,
    hints: [
      R`The roots of $z^5 = 1$ other than 1 satisfy $z^4 + z^3 + z^2 + z + 1 = 0$.`,
      R`Divide by $z^2$ and let $w = z + 1/z = 2\cos\theta$.`,
      R`$z^2 + 1/z^2 = w^2 - 2$.`
    ],
    sol: R`Dividing by $z^2$: $(z^2 + z^{-2}) + (z + z^{-1}) + 1 = 0 \Rightarrow w^2 + w - 1 = 0$, so
$$w = \frac{-1\pm\sqrt5}{2}.$$
For $z = e^{2\pi i/5}$, $w = 2\cos72^\circ > 0$, so
$$\cos\frac{2\pi}{5} = \frac{\sqrt5 - 1}{4} \approx 0.309.$$
The other root gives $\cos\tfrac{4\pi}{5} = -\tfrac{1+\sqrt5}{4}$. The golden ratio appears because of the regular pentagon.`,
    insight: R`Palindromic polynomials → substitute $w = z + 1/z$. Roots of unity link algebra and geometry.`,
    follow: R`Use this to show the diagonal-to-side ratio of a regular pentagon is the golden ratio $\varphi$.`
  });

  Q({ id: 'al-real-roots', topic: 'algebra', diff: 3, mins: 7,
    title: 'How many real roots?',
    q: R`How many real solutions does $x^5 - 5x + 1 = 0$ have? Locate each between consecutive integers, and say how you'd find one to 3 decimal places.`,
    hints: [
      R`Find the turning points from $f'(x) = 5x^4 - 5$.`,
      R`Evaluate $f$ at the turning points and use the intermediate value theorem.`
    ],
    sol: R`$f'(x) = 0$ at $x = \pm1$. $f(-1) = 5 > 0$ (local max), $f(1) = -3 < 0$ (local min). As $x\to\pm\infty$, $f\to\pm\infty$, so there are <b>three real roots</b>, one in each of $(-\infty,-1)$, $(-1,1)$ and $(1,\infty)$.

Locating: $f(-2) = -21$, so one root is in $(-2,-1)$. $f(0) = 1$, so one is in $(0,1)$. $f(2) = 23$, so one is in $(1,2)$. The other two roots are complex.

Newton–Raphson, $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$, from $x_0 = 0$: $x_1 = 0.2$, $x_2 \approx 0.2000 - \dfrac{0.00032}{-4.992}\approx 0.20006$. It converges quadratically.`,
    insight: R`Turning points plus sign changes tell you the number of real roots without solving. Know Newton–Raphson and when it fails (near $f' = 0$).`,
    follow: R`For which values of $k$ does $x^5 - 5x + k = 0$ have exactly three real roots?`
  });

  Q({ id: 'al-quartic', topic: 'algebra', diff: 4, mins: 8,
    title: 'Hidden quadratic in a quartic',
    q: R`Solve $x^4 + x^3 - 4x^2 + x + 1 = 0$.`,
    hints: [
      R`The coefficients read the same forwards and backwards. Divide by $x^2$.`,
      R`Let $u = x + \dfrac1x$, so $x^2 + \dfrac{1}{x^2} = u^2 - 2$.`
    ],
    sol: R`Dividing by $x^2$: $\left(x^2 + \tfrac{1}{x^2}\right) + \left(x + \tfrac1x\right) - 4 = 0 \Rightarrow u^2 + u - 6 = 0$, so $u = 2$ or $u = -3$.

$x + \tfrac1x = 2 \Rightarrow x = 1$ (double root).

$x + \tfrac1x = -3 \Rightarrow x^2 + 3x + 1 = 0 \Rightarrow x = \dfrac{-3\pm\sqrt5}{2}$.`,
    insight: R`Look for structure before brute force: symmetry of coefficients, substitutions like $2^x$, $x^2$, or $x + 1/x$.`,
    follow: R`Solve $4^x - 3\cdot2^{x+1} + 8 = 0$, and $\sqrt{x+5} = x - 1$ (watch for spurious roots).`
  });

  Q({ id: 'al-mortgage', topic: 'algebra', diff: 4, mins: 10,
    title: 'Derive the mortgage formula',
    q: R`You borrow £$L$ at monthly interest rate $r$ and repay a fixed £$P$ each month for $n$ months. Derive $P$. Estimate the monthly payment on £200 000 over 25 years at 4% a year, and the total paid back.`,
    hints: [
      R`Balance after month $k$: $B_k = (1+r)B_{k-1} - P$.`,
      R`Unroll it: $B_n = L(1+r)^n - P[1 + (1+r) + \dots + (1+r)^{n-1}]$, and set $B_n = 0$.`
    ],
    sol: R`$B_n = L(1+r)^n - P\dfrac{(1+r)^n - 1}{r} = 0$, so
$$P = \frac{rL(1+r)^n}{(1+r)^n - 1}.$$
With $r = 0.04/12 \approx 0.00333$ and $n = 300$: $(1+r)^n \approx e^{300\times0.00333} \approx e^{1} \approx 2.71$, so $P \approx 666.7\times\dfrac{2.71}{1.71}\approx$ <b>£1056/month</b>. The total is about £317 000, so you pay £117 000 in interest.`,
    insight: R`Write a recurrence, unroll it, and recognise a geometric series. Approximating $(1+r)^n \approx e^{nr}$ helps with mental arithmetic.`,
    follow: R`What happens as $n\to\infty$? Interpret $P \to rL$ physically.`
  });

  Q({ id: 'al-sum-squares', topic: 'algebra', diff: 3, mins: 7,
    title: 'Sum of squares without memorising',
    q: R`Derive a formula for $1^2 + 2^2 + \dots + n^2$ without being told the answer. Then estimate $\sum_{k=1}^{1000} k^2$ quickly.`,
    hints: [
      R`Use the telescoping sum $\sum_{k=1}^n[(k+1)^3 - k^3] = (n+1)^3 - 1$.`,
      R`Expand $(k+1)^3 - k^3 = 3k^2 + 3k + 1$.`
    ],
    sol: R`$(n+1)^3 - 1 = 3S_2 + 3\cdot\dfrac{n(n+1)}{2} + n$. Solving:
$$S_2 = \frac{n(n+1)(2n+1)}{6}.$$
For $n = 1000$: $\dfrac{1000\cdot1001\cdot2001}{6} \approx 333\,833\,500$. Compare $\int_0^{1000}x^2dx = 3.33\times10^8$. ✓`,
    insight: R`Telescoping sums let you derive power sums. Check against the integral approximation $n^3/3$.`,
    follow: R`Prove it by induction too. Which method would you trust to find $\sum k^3$, and what is it?`
  });

  Q({ id: 'al-modular', topic: 'algebra', diff: 3, mins: 6,
    title: 'Last digits of huge powers',
    q: R`Find the remainder when $2^{100}$ is divided by 7, and the last two digits of $7^{100}$.`,
    hints: [
      R`Find a small power that is $\equiv 1$.`,
      R`$2^3 = 8 \equiv 1 \pmod 7$. $7^4 = 2401$.`
    ],
    sol: R`$2^{100} = (2^3)^{33}\cdot2 \equiv 1^{33}\cdot2 = 2 \pmod 7$.

$7^4 = 2401 \equiv 1 \pmod{100}$, so $7^{100} = (7^4)^{25} \equiv 1$. The last two digits are <b>01</b>.`,
    insight: R`Look for a cycle. Modular arithmetic turns huge numbers into tiny ones.`,
    follow: R`Prove that $n^3 - n$ is divisible by 6 for every integer $n$.`
  });

  Q({ id: 'al-coconuts', topic: 'algebra', diff: 5, mins: 14,
    title: 'Sailors, coconuts and a monkey',
    q: R`Five sailors gather a pile of coconuts. During the night, each sailor in turn wakes, divides the pile into five equal shares with one coconut left over (which goes to a monkey), hides their share, and pushes the rest back together. In the morning they divide what remains into five equal shares exactly. What is the smallest possible number of coconuts?`,
    hints: [
      R`Each step: $N \to \tfrac45(N - 1)$.`,
      R`The trick: imagine adding 4 (negative-free) "phantom" coconuts. $\tfrac45(N - 1) + 4 = \tfrac45(N + 4)$.`,
      R`So $N + 4$ must be divisible by 5 five times over.`
    ],
    sol: R`Note $\tfrac45(N-1) + 4 = \tfrac45(N + 4)$. So if $M = N + 4$, each night-time step just multiplies $M$ by $\tfrac45$. After five steps, $M_5 = \left(\tfrac45\right)^5(N+4)$ must be an integer, so $5^5 = 3125$ divides $N + 4$.

The smallest is $N = 3125 - 4 = $ <b>3121</b>. Check: after five nights there are $\tfrac{4^5}{5^5}\cdot3125 - 4 = 1020$ coconuts, divisible by 5 ✓.

(If the morning division also leaves one for the monkey, you need $5^6 \mid N + 4$, giving 15 621.)`,
    insight: R`Find a shift that makes an affine map purely multiplicative (a fixed point: $N = -4$ maps to itself). This is the same idea as finding the steady state of a recurrence.`,
    follow: R`Generalise to $n$ sailors. (Answer: $n^{n} - (n-1)$ for the exact-morning version, when $n$ is odd.)`
  });

  Q({ id: 'al-matrix', topic: 'algebra', diff: 3, mins: 7,
    title: 'A matrix whose square is −I',
    q: R`Find a real $2\times2$ matrix $M$ with $M^2 = -I$, and interpret it geometrically. Find a real matrix with $M^6 = I$ but $M^k \ne I$ for $0 < k < 6$. What does $\det M$ tell you geometrically?`,
    hints: [
      R`Think about rotations. What rotation applied twice gives a rotation by 180°?`,
      R`A rotation by $\theta$ is $\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$.`
    ],
    sol: R`$M = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$ is a rotation by 90°, and two of them make 180°, which is $-I$. It behaves like $i$ in the complex numbers.

Rotation by 60°: $M = \begin{pmatrix}\tfrac12&-\tfrac{\sqrt3}{2}\\\tfrac{\sqrt3}{2}&\tfrac12\end{pmatrix}$ has $M^6 = I$ for the first time at $k = 6$.

$\det M$ is the factor by which areas are scaled, with the sign showing whether orientation is reversed. Rotations have $\det = 1$.`,
    insight: R`Think of matrices as transformations rather than grids of numbers. Rotations ↔ complex numbers is a powerful link.`,
    follow: R`What does $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ do? Find its $n$th power.`
  });

  Q({ id: 'al-golden', topic: 'algebra', diff: 3, mins: 7,
    title: 'Continued fraction and Fibonacci',
    q: R`Evaluate $1 + \cfrac{1}{1 + \cfrac{1}{1 + \cdots}}$. Show that the ratios of consecutive Fibonacci numbers converge to the same value, and find a closed form for $F_n$.`,
    hints: [
      R`$x = 1 + 1/x$.`,
      R`Truncating the continued fraction gives $F_{n+1}/F_n$.`,
      R`Try $F_n = \lambda^n$ in $F_{n+1} = F_n + F_{n-1}$.`
    ],
    sol: R`$x^2 = x + 1 \Rightarrow x = \varphi = \dfrac{1+\sqrt5}{2} \approx 1.618$.

The truncations are $1, 2, \tfrac32, \tfrac53, \tfrac85, \dots = F_{n+1}/F_n$.

Trying $\lambda^n$ gives $\lambda^2 = \lambda + 1$, so $\lambda = \varphi$ or $\psi = \tfrac{1-\sqrt5}{2}$. Fitting $F_0 = 0$, $F_1 = 1$:
$$F_n = \frac{\varphi^n - \psi^n}{\sqrt5}.$$
Since $|\psi| < 1$, the ratio $F_{n+1}/F_n \to \varphi$.`,
    insight: R`Linear recurrences are solved like linear ODEs: try exponentials. The dominant root controls the long-term behaviour.`,
    follow: R`Show that $F_n$ is the nearest integer to $\varphi^n/\sqrt5$.`
  });

  /* ───────────── GEOMETRY & SHAPES ───────────── */

  Q({ id: 'ge-goat', topic: 'geometry', diff: 5, mins: 15,
    title: 'Goat in a field',
    q: R`A goat is tethered to a post on the edge of a circular field of radius $R$. How long must the rope be so the goat can graze exactly half the field? Set up the equation and estimate the answer.`,
    hints: [
      R`The grazed region is the overlap (a lens) of the field and a circle of radius $r$ centred on the boundary.`,
      R`Let $\beta$ be the angle at the post between the line to the field's centre and the line to an intersection point. In the isosceles triangle, $r = 2R\cos\beta$.`,
      R`Lens area = sector of the rope circle ($r^2\beta$) + sector of the field ($R^2(\pi - 2\beta)$) − the kite ($Rr\sin\beta$).`
    ],
    sol: R`Using the triangle with the post $T$, the centre $O$ and an intersection point $P$ ($OT = OP = R$, $TP = r$): the base angles are $\beta$, $r = 2R\cos\beta$, and the angle at $O$ is $\pi - 2\beta$.
$$\text{Area} = r^2\beta + R^2(\pi - 2\beta) - Rr\sin\beta = \frac{\pi R^2}{2}.$$
Substituting $r = 2R\cos\beta$ and simplifying:
$$2\beta\cos2\beta - \sin2\beta + \frac\pi2 = 0.$$
This is transcendental, so solve it numerically: $\beta \approx 0.9528$ rad, so $r \approx 1.1587R$.

Sanity checks: $r = R$ grazes about 39% of the field, and $r = \sqrt2 R$ grazes more than half. The answer lies between.`,
    insight: R`Breaking a lens into sectors minus triangles is the key move. Interviewers expect you to reach the equation and say "solve numerically", with bounds as checks.`,
    follow: R`What if the goat is tethered to the outside of a circular silo instead? (The rope wraps around: a much harder involute problem.)`
  });

  Q({ id: 'ge-earth-string', topic: 'geometry', diff: 5, mins: 12,
    title: 'A rope around the Earth',
    q: R`A rope fits snugly around the equator. It's lengthened by 1 m. (a) If it's raised uniformly all round, how high off the ground is it? (b) If instead it's pulled up at <i>one</i> point until taut, how high is that point? (Take $R = 6400$ km.)`,
    hints: [
      R`(a) $2\pi(R+h) - 2\pi R = 1$.`,
      R`(b) The rope leaves the surface along two tangents meeting at the peak. If each tangent makes an angle $\alpha$ at the centre, the extra length is $2R(\tan\alpha - \alpha)$.`,
      R`For small $\alpha$, $\tan\alpha - \alpha \approx \alpha^3/3$, and the height is $R(\sec\alpha - 1)\approx R\alpha^2/2$.`
    ],
    sol: R`<b>(a)</b> $h = \dfrac{1}{2\pi}\approx 16$ cm, independent of the planet's size. A cat could crawl under it.

<b>(b)</b> $2R(\tan\alpha - \alpha) = 1 \Rightarrow \dfrac{2R\alpha^3}{3} \approx 1 \Rightarrow \alpha^3 = \dfrac{3}{2\times6.4\times10^6} \approx 2.34\times10^{-7}$, so $\alpha \approx 6.2\times10^{-3}$ rad. Then
$$h \approx \frac{R\alpha^2}{2} \approx \frac{6.4\times10^6\times3.8\times10^{-5}}{2} \approx 120 \text{ m}.$$
That's a 40-storey building, from one extra metre of rope.`,
    insight: R`The same extra length gives wildly different results depending on how it's distributed. Spot the small-angle expansion $\tan\alpha - \alpha \approx \alpha^3/3$: the cube is what makes $h$ large.`,
    follow: R`How does the answer to (b) scale with $R$ and with the extra length? (As $R^{1/3}\ell^{2/3}$.)`
  });

  Q({ id: 'ge-horizon', topic: 'geometry', diff: 4, mins: 9,
    title: 'Horizon and the size of the Earth',
    q: R`How far away is the horizon for a person 1.8 m tall standing by the sea? Then: you watch the sun set while lying on a beach, stand up quickly, and watch it set again 10 seconds later. Estimate the radius of the Earth.`,
    hints: [
      R`Pythagoras: $(R+h)^2 = R^2 + d^2$, so $d \approx \sqrt{2Rh}$.`,
      R`Standing up lets you see further round the curve, by an angle $\theta$ at the Earth's centre with $\tan\theta = d/R$.`,
      R`In 10 s the Earth rotates through $\theta = 2\pi\cdot10/86400$ (near the equator, sun setting vertically).`
    ],
    sol: R`$d = \sqrt{2Rh} = \sqrt{2\times6.4\times10^6\times1.8}\approx 4.8$ km.

Second sunset: $\theta \approx d/R = \sqrt{2h/R}$, so $R = \dfrac{2h}{\theta^2}$. With $\theta = 7.27\times10^{-5}\times10 = 7.27\times10^{-4}$ rad and $h = 1.7$ m (eye-height difference):
$$R \approx \frac{3.4}{5.3\times10^{-7}} \approx 6.4\times10^{6}\text{ m}.$$
Away from the equator the sun sets at a slant, which lengthens the delay, so you'd need to correct for latitude.`,
    insight: R`$d \approx \sqrt{2Rh}$ is a great tool for estimation. Turning a time difference into an angle via Earth's rotation is a beautiful experimental idea.`,
    follow: R`Refraction bends light around the curve. Does it make the horizon nearer or further? By roughly how much?`
  });

  Q({ id: 'ge-cube-diagonal', topic: 'geometry', diff: 3, mins: 6,
    title: 'Angle between cube diagonals',
    q: R`Find the angle between two space diagonals of a cube. Hence find the bond angle in methane, where the H atoms sit at alternate corners of a cube with the C atom at the centre.`,
    hints: [
      R`Use vectors from the centre: $(1,1,1)$ and $(1,-1,-1)$, for example.`,
      R`$\cos\theta = \dfrac{\mathbf a\cdot\mathbf b}{|\mathbf a||\mathbf b|}$.`
    ],
    sol: R`Space diagonals through the centre: $(1,1,1)$ and $(1,1,-1)$ give $\cos\theta = \tfrac13$, so $\theta \approx 70.5^\circ$ (or its supplement, 109.5°).

Methane: H at $(1,1,1)$, $(1,-1,-1)$, $(-1,1,-1)$ and $(-1,-1,1)$. The angle between $(1,1,1)$ and $(1,-1,-1)$ has $\cos\theta = -\tfrac13$, so $\theta \approx$ <b>109.47°</b>, the tetrahedral angle.`,
    insight: R`Vectors plus the dot product turn 3D geometry into arithmetic. Embedding a tetrahedron in a cube is a classic trick.`,
    follow: R`What fraction of the cube's volume does that tetrahedron occupy? (Answer: 1/3.)`
  });

  Q({ id: 'ge-ladder-corner', topic: 'geometry', diff: 5, mins: 12,
    title: 'Ladder around a corner',
    q: R`Two corridors of widths $a$ and $b$ meet at a right angle. What is the longest rigid ladder that can be carried horizontally around the corner?`,
    hints: [
      R`The longest ladder that fits is the <i>shortest</i> segment touching the inner corner and both outer walls.`,
      R`At angle $\theta$, the length is $L(\theta) = \dfrac{a}{\sin\theta} + \dfrac{b}{\cos\theta}$. Minimise it.`
    ],
    sol: R`$L'(\theta) = -\dfrac{a\cos\theta}{\sin^2\theta} + \dfrac{b\sin\theta}{\cos^2\theta} = 0 \Rightarrow \tan^3\theta = \dfrac ab$.

Substituting, with $\tan\theta = (a/b)^{1/3}$:
$$L_\text{max} = \left(a^{2/3} + b^{2/3}\right)^{3/2}.$$
For $a = b$: $L = 2\sqrt2\,a$. ✓ (Diagonal through the corner at 45°.)`,
    insight: R`Reframe "maximum that fits" as "minimum of the obstruction". The max of one problem is the min of another.`,
    follow: R`If the ladder can be tilted (corridor height $h$), how does the answer change?`
  });

  Q({ id: 'ge-ellipse', topic: 'geometry', diff: 3, mins: 6,
    title: 'Area of an ellipse',
    q: R`Find the area of the ellipse $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ in two different ways. Why is there no equally simple formula for its perimeter?`,
    hints: [
      R`Way 1: stretch a circle. Way 2: integrate $2b\sqrt{1 - x^2/a^2}$.`
    ],
    sol: R`<b>Stretching:</b> scale the unit circle by $a$ in $x$ and $b$ in $y$. Areas scale by $ab$, so the area is $\pi ab$.

<b>Integration:</b> $\displaystyle\int_{-a}^{a}2b\sqrt{1-\tfrac{x^2}{a^2}}\,dx$. With $x = a\sin t$ this becomes $2ab\int_{-\pi/2}^{\pi/2}\cos^2t\,dt = \pi ab$.

The perimeter isn't preserved by stretching: lengths scale differently depending on direction. The arc-length integral $\int\sqrt{a^2\cos^2t + b^2\sin^2t}\,dt$ is an <i>elliptic integral</i> with no elementary closed form. (Ramanujan's approximation is $\pi[3(a+b) - \sqrt{(3a+b)(a+3b)}]$.)`,
    insight: R`Linear transformations scale area by the determinant. That's an elegant argument worth knowing.`,
    follow: R`Estimate the perimeter of an ellipse with $a = 2$, $b = 1$ by bounding it between simple shapes.`
  });

  Q({ id: 'ge-arcs-square', topic: 'geometry', diff: 5, mins: 14,
    title: 'Four arcs in a square',
    q: R`In a unit square, four quarter-circles of radius 1 are drawn, each centred at a corner. Find the area of the central region that lies inside all four quarter-circles.`,
    hints: [
      R`Find where adjacent arcs intersect. The arcs from $(0,0)$ and $(1,0)$ meet at $(\tfrac12, \tfrac{\sqrt3}{2})$.`,
      R`The central region is bounded by four arcs. Its vertices are at points like $(\tfrac12, \tfrac{\sqrt3}{2})$ and $(1 - \tfrac{\sqrt3}{2}, \tfrac12)$.`,
      R`Split it into an inner square plus four circular segments.`
    ],
    sol: R`The four vertices of the curvy region are at $(\tfrac12, \tfrac{\sqrt3}2)$, $(\tfrac{\sqrt3}2, \tfrac12)$, $(\tfrac12, 1-\tfrac{\sqrt3}2)$ and $(1-\tfrac{\sqrt3}2, \tfrac12)$. Each arc spans 30° seen from its centre.

The inner square (joining the vertices) has diagonal $\sqrt3 - 1$, so its area is $\tfrac12(\sqrt3-1)^2 = 2 - \sqrt3$.

Each segment = sector − triangle $= \dfrac{\pi}{12} - \tfrac12\sin30^\circ = \dfrac\pi{12} - \dfrac14$.

Total:
$$2 - \sqrt3 + 4\left(\frac{\pi}{12} - \frac14\right) = 1 + \frac\pi3 - \sqrt3 \approx 0.315.$$`,
    insight: R`Find the intersection points first. Then decompose the region into a polygon plus circular segments.`,
    follow: R`Find the area of the region inside exactly two of the quarter-circles.`
  });

  Q({ id: 'ge-triangle-square', topic: 'geometry', diff: 4, mins: 10,
    title: 'Largest equilateral triangle in a square',
    q: R`What is the largest equilateral triangle that fits inside a unit square? Give its side length exactly.`,
    hints: [
      R`Intuition says one vertex should be at a corner and the triangle symmetric about the diagonal.`,
      R`Then the other two vertices lie on the far sides, and the triangle's sides from the corner make 15° with the square's edges.`
    ],
    sol: R`Place one vertex at a corner and the triangle symmetric about the diagonal. Each side from the corner makes $15^\circ$ with an edge and ends on the opposite side, so its length is $s = \dfrac{1}{\cos15^\circ}$.

$\cos15^\circ = \dfrac{\sqrt6+\sqrt2}{4}$, so
$$s = \frac{4}{\sqrt6+\sqrt2} = \sqrt6 - \sqrt2 \approx 1.035.$$
That's slightly longer than the side of the square. (Proving optimality takes more work: the maximal triangle must touch all four sides.)`,
    insight: R`Use symmetry to guess the extremal configuration, then compute. Exact trig values for 15° come from $\cos(45° - 30°)$.`,
    follow: R`What is the largest square that fits inside an equilateral triangle of side 1?`
  });

  Q({ id: 'ge-tetrahedron', topic: 'geometry', diff: 3, mins: 7,
    title: 'Volume of a regular tetrahedron',
    q: R`Find the volume of a regular tetrahedron of edge $a$ in two ways: directly, and by cutting it out of a cube.`,
    hints: [
      R`Direct: volume $= \tfrac13\times$ base area $\times$ height. The centroid of the base is $a/\sqrt3$ from each vertex.`,
      R`Cube method: a tetrahedron with edge $a$ sits in a cube of side $a/\sqrt2$. Remove four corner pyramids.`
    ],
    sol: R`<b>Direct:</b> base $\tfrac{\sqrt3}{4}a^2$, height $\sqrt{a^2 - a^2/3} = a\sqrt{2/3}$. Volume $= \tfrac13\cdot\tfrac{\sqrt3}{4}a^2\cdot a\sqrt{\tfrac23} = \dfrac{a^3}{6\sqrt2}$.

<b>Cube:</b> side $c = a/\sqrt2$. Each corner pyramid has volume $\tfrac16c^3$, and there are four of them: $c^3 - \tfrac46c^3 = \tfrac13c^3 = \tfrac13\cdot\dfrac{a^3}{2\sqrt2} = \dfrac{a^3}{6\sqrt2}$. ✓`,
    insight: R`Two independent methods that agree prove you right. Interviewers love that habit.`,
    follow: R`Find the radius of the sphere that touches all four faces.`
  });

  Q({ id: 'ge-hatbox', topic: 'geometry', diff: 4, mins: 10,
    title: 'Slicing an orange',
    q: R`An orange (a sphere of radius $R$) is cut into slices of equal thickness by parallel cuts. Show that every slice has the same amount of peel, whether it comes from the middle or near the end. Hence find the surface area of a sphere.`,
    hints: [
      R`A thin band at height $z$ has radius $\sqrt{R^2-z^2}$, but its slant width is $dz/\cos\phi$, where $\phi$ is the tilt of the surface.`,
      R`The two effects cancel exactly.`
    ],
    sol: R`At height $z$ the band radius is $\rho = R\sin\theta$ (with $z = R\cos\theta$). The band's slant width is $R\,d\theta = \dfrac{dz}{\sin\theta}$. So
$$dA = 2\pi\rho\cdot\frac{dz}{\sin\theta} = 2\pi R\,dz,$$
which is independent of $z$. A slice of thickness $h$ has peel $2\pi Rh$ (Archimedes' hat-box theorem). The whole sphere ($h = 2R$) has area $4\pi R^2$.`,
    insight: R`Two effects cancelling exactly (smaller radius, steeper slope) is the kind of elegant result interviewers like to see you derive.`,
    follow: R`This is why a cylindrical (Lambert) map projection preserves area. Explain.`
  });

  Q({ id: 'ge-parabola', topic: 'geometry', diff: 4, mins: 10,
    title: 'Why satellite dishes are parabolic',
    q: R`Show that every ray travelling parallel to the axis of the parabola $y = x^2/(4f)$ reflects through the point $(0, f)$. Why not use a spherical mirror?`,
    hints: [
      R`Use the definition: the parabola is the set of points equidistant from the focus $(0,f)$ and the directrix $y = -f$.`,
      R`The tangent at a point bisects the angle between the line to the focus and the perpendicular to the directrix.`
    ],
    sol: R`Check the definition: the distance from $(x, x^2/4f)$ to $(0,f)$ equals $\tfrac{x^2}{4f} + f$, the distance to the line $y = -f$.

Take a point $P$ on the parabola, its foot $D$ on the directrix and the focus $F$. Since $PF = PD$, triangle $PFD$ is isosceles, and the tangent at $P$ is the perpendicular bisector of $FD$. So the tangent bisects angle $FPD$. A vertical incoming ray (parallel to $PD$) therefore reflects along $PF$: the angle of incidence equals the angle of reflection.

All path lengths from a plane wavefront to the focus are equal, so the waves arrive in phase. A spherical mirror has <b>spherical aberration</b>: only near-axis rays focus at $R/2$. A sphere is fine for small apertures because it matches the parabola near the vertex.`,
    insight: R`Use the focus–directrix property rather than calculus. Link it to equal path lengths and phase (the wave picture).`,
    follow: R`Why are car headlights parabolic but makeup mirrors spherical? What's an ellipse's reflective property?`
  });

  /* ───────────── PROBABILITY & LOGIC ───────────── */

  Q({ id: 'pr-monty', topic: 'probability', diff: 3, mins: 8,
    title: 'Monty Hall, generalised',
    q: R`A game show has 3 doors with one car. You pick a door. The host, who knows where the car is, opens a different door showing a goat and offers you a switch. Should you? Now generalise to $n$ doors, where the host opens just one goat door.`,
    hints: [
      R`Your first pick is right with probability $1/n$. The host's action doesn't change that.`,
      R`If you switch, you win if your first pick was wrong AND you then pick the car from the $n-2$ remaining doors.`
    ],
    sol: R`<b>3 doors:</b> staying wins with probability $\tfrac13$, switching with $\tfrac23$. Switch.

<b>$n$ doors:</b> $P(\text{win by switching}) = \dfrac{n-1}{n}\cdot\dfrac{1}{n-2}$, which is greater than $\dfrac{1}{n}$ since $\dfrac{n-1}{n-2} > 1$. Switching always helps, but only slightly for large $n$.

The key is that the host's choice is <b>informative</b>: the host is constrained to avoid the car. If the host opened a door at random and happened to show a goat, the odds would be 50:50.`,
    insight: R`Probability depends on the process that generated the information, not just the outcome. Stating that explicitly impresses.`,
    follow: R`How would you convince a sceptic in 30 seconds? (Think of 100 doors with the host opening 98 of them.)`
  });

  Q({ id: 'pr-birthday', topic: 'probability', diff: 3, mins: 8,
    title: 'Birthday problem',
    q: R`How many people do you need in a room for a better-than-even chance that two share a birthday? Derive an approximate formula you could work out in your head.`,
    hints: [
      R`Compute the probability that all birthdays are different.`,
      R`$P(\text{all different}) = \prod_{k=0}^{n-1}\left(1 - \tfrac{k}{365}\right)$. Use $1 - x \approx e^{-x}$.`
    ],
    sol: R`$P(\text{no match}) \approx \exp\!\left(-\sum_{k<n}\frac{k}{365}\right) = \exp\!\left(-\frac{n(n-1)}{730}\right).$

Set it equal to $\tfrac12$: $n(n-1) \approx 730\ln2 \approx 506$, so $n \approx 23$.

The surprise is because the number of <b>pairs</b>, $\binom{23}{2} = 253$, is large.`,
    insight: R`The approximation $1 - x\approx e^{-x}$ turns products into sums. Count pairs, not people.`,
    follow: R`Hash collisions in computing: with a 64-bit hash, roughly how many items before a collision becomes likely? (About $2^{32}$.)`
  });

  Q({ id: 'pr-pirates', topic: 'probability', diff: 5, mins: 14,
    title: 'Pirate game',
    q: R`Five rational pirates of strict seniority must split 100 gold coins. The most senior proposes a split, and everyone votes. If at least half vote yes (the proposer votes too), it passes. Otherwise the proposer is thrown overboard and the next most senior proposes. Each pirate wants first to survive, then to maximise gold, and, all else equal, prefers to see others thrown overboard. What should the most senior pirate propose?`,
    hints: [
      R`Work backwards from the case with just two pirates.`,
      R`With two pirates, the senior one keeps everything (their own vote is half).`,
      R`Each proposer needs to buy just enough votes, each costing 1 coin more than that pirate would get otherwise.`
    ],
    sol: R`Label the pirates A (most senior) to E.

<b>D, E:</b> D takes 100 (their own vote is 50%). Split $(100, 0)$.

<b>C, D, E:</b> C needs one more vote. E gets 0 otherwise, so 1 coin buys E. Split $(99, 0, 1)$.

<b>B, C, D, E:</b> B needs one more vote. D gets 0 under C's plan, so B gives D 1. Split $(99, 0, 1, 0)$.

<b>A–E:</b> A needs two more votes. C and E get 0 under B's plan, so 1 coin each buys them. <b>A proposes $(98, 0, 1, 0, 1)$.</b>`,
    insight: R`Backward induction: solve the smallest case first, then build up. This is the core idea of dynamic programming and game theory.`,
    follow: R`What happens with 200 pirates and 100 coins? (A deep pattern emerges involving powers of 2.)`
  });

  Q({ id: 'pr-tuesday', topic: 'probability', diff: 5, mins: 12,
    title: 'Boy born on a Tuesday',
    q: R`(a) A family has two children and at least one is a boy. What's the probability both are boys? (b) A family has two children and at least one is a boy born on a Tuesday. What's the probability both are boys? Why does the day of the week matter?`,
    hints: [
      R`(a) List the equally likely outcomes: BB, BG, GB, GG.`,
      R`(b) Each child is one of 14 equally likely (sex, day) types. Count pairs with at least one Tuesday-boy.`
    ],
    sol: R`<b>(a)</b> Excluding GG leaves BB, BG, GB, so $P = \tfrac13$.

<b>(b)</b> There are $14^2 = 196$ ordered pairs. Pairs with at least one Tuesday-boy: $196 - 13^2 = 27$. Of these, both are boys in $7 + 7 - 1 = 13$ cases. So $P = \dfrac{13}{27} \approx 0.48$.

Why it matters: the more specific the information, the closer it gets to identifying one particular child, which pushes the answer towards $\tfrac12$. "At least one boy" says almost nothing about which child; "a Tuesday boy" nearly singles one out.`,
    insight: R`Conditional probability depends on exactly what was observed and how. Enumerating equally likely outcomes beats intuition here.`,
    follow: R`How would the answer change if you learned it because you met one child at random and it was a Tuesday-boy? (Then it's exactly $\tfrac12$.)`
  });

  Q({ id: 'pr-coupon', topic: 'probability', diff: 4, mins: 10,
    title: 'Rolling until every face appears',
    q: R`What's the expected number of rolls of a fair die to see a 6? And the expected number to see <i>every</i> face at least once?`,
    hints: [
      R`For a single 6: geometric distribution with $p = \tfrac16$.`,
      R`For all faces: after you've seen $k$ distinct faces, the next new face takes a geometric number of rolls with $p = \tfrac{6-k}{6}$.`
    ],
    sol: R`A single 6 takes an expected $\dfrac{1}{p} = 6$ rolls (from $E = 1 + \tfrac56E$).

All faces: by linearity,
$$E = \frac66 + \frac65 + \frac64 + \frac63 + \frac62 + \frac61 = 6\left(1 + \tfrac12 + \tfrac13 + \tfrac14 + \tfrac15 + \tfrac16\right) = 14.7.$$
In general it's $nH_n \approx n\ln n$ (the coupon collector problem).`,
    insight: R`Break a complex waiting time into stages, then add their expectations. Linearity of expectation works even when the stages are dependent.`,
    follow: R`Expected number of fair coin flips to get HH? And HT? (6 and 4. Why are they different?)`
  });

  Q({ id: 'pr-eggs', topic: 'probability', diff: 5, mins: 12,
    title: 'Two eggs, 100 floors',
    q: R`You have two identical eggs and a 100-floor building. There's a highest floor from which an egg survives a drop. An egg that survives can be reused; a broken one can't. What's the minimum number of drops that guarantees you find the critical floor, and what's the strategy?`,
    hints: [
      R`With one egg you must go floor by floor.`,
      R`If your first drop is from floor $k$ and it breaks, you need up to $k-1$ more drops. So make each later jump one floor smaller.`,
      R`Find the smallest $n$ with $n + (n-1) + \dots + 1 \ge 100$.`
    ],
    sol: R`With $n$ drops allowed, drop the first egg from floor $n$. If it breaks, test floors $1$ to $n-1$ one at a time with the second egg (total $\le n$). If it survives, jump $n-1$ floors higher, and so on.

You can cover $n + (n-1) + \dots + 1 = \tfrac{n(n+1)}{2}$ floors. We need $\tfrac{n(n+1)}2 \ge 100$, so $n = $ <b>14</b>. Drop from floors 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100.`,
    insight: R`Balance the worst case across branches so every path uses the same budget. This is the essence of minimax design.`,
    follow: R`With 3 eggs, how many floors can $n$ drops cover? (Sum of binomial coefficients: $\binom n1 + \binom n2 + \binom n3$.)`
  });

  Q({ id: 'pr-juice', topic: 'probability', diff: 3, mins: 6,
    title: 'Orange juice and apple juice',
    q: R`(A classic used by Cambridge Engineering academics in their practice problems.) One glass holds 250 ml of orange juice and another 250 ml of apple juice. You move a 20 ml spoonful of orange into the apple and stir. Then you move a 20 ml spoonful of the mixture back. Is there now more apple in the orange glass, or more orange in the apple glass? Does it matter if you don't stir?`,
    hints: [
      R`Both glasses end up with exactly 250 ml.`,
      R`Whatever orange is missing from the orange glass must be in the apple glass. What has replaced it?`
    ],
    sol: R`<b>Exactly equal.</b> Each glass ends with 250 ml. The orange glass has lost some orange, $x$ ml, and since its volume is back to 250 ml, it must have gained exactly $x$ ml of apple. That missing orange is in the apple glass. So the amounts swapped are equal.

The argument uses only conservation of volume, so it <b>doesn't matter whether you stir</b>, how big the spoon is, or how many times you go back and forth, provided both glasses end with their original volume.

(By direct calculation with stirring: $x = 20\cdot\tfrac{250}{270}\approx 18.5$ ml.)`,
    insight: R`Find the conservation law and you can skip the calculation. Then show the calculation agrees.`,
    follow: R`Repeat the swap infinitely many times. What are the final concentrations?`
  });

  Q({ id: 'pr-hats', topic: 'probability', diff: 5, mins: 12,
    title: '100 prisoners and hats',
    q: R`100 prisoners stand in a line, each wearing a red or blue hat. Each can see the hats in front of them but not their own or those behind. Starting from the back, each must call out "red" or "blue", and everyone hears every call. Those who name their own hat colour survive. They can agree a strategy beforehand. How many can be guaranteed to survive?`,
    hints: [
      R`The prisoner at the back can see 99 hats. Can they encode something useful in one word?`,
      R`Parity.`
    ],
    sol: R`<b>99 are guaranteed.</b> The back prisoner says "red" if they see an even number of red hats and "blue" if odd. (They survive only by luck: 50%.)

Each subsequent prisoner knows the original parity, can see the hats in front, and has heard every call between the back and themselves (all of which are correct). So they can deduce their own colour exactly.

You can't do better: the first speaker has no information about their own hat.`,
    insight: R`One bit of shared information (parity) lets everyone decode their own hat. This is the idea behind parity bits and error-detecting codes in engineering.`,
    follow: R`What if there are three hat colours? (Use the sum modulo 3.)`
  });

  Q({ id: 'pr-stick', topic: 'probability', diff: 5, mins: 12,
    title: 'Breaking a stick into a triangle',
    q: R`A stick of length 1 is broken at two points chosen uniformly at random. What's the probability that the three pieces can form a triangle?`,
    hints: [
      R`Three lengths form a triangle exactly when each is less than $\tfrac12$.`,
      R`Represent the two break points as $(x, y)$ in the unit square and shade the favourable region.`
    ],
    sol: R`Taking $x < y$ (half the square, then double by symmetry), the pieces are $x$, $y - x$ and $1 - y$. We need all three $< \tfrac12$: $x < \tfrac12$, $y > \tfrac12$, $y - x < \tfrac12$.

In the triangle $0 < x < y < 1$ (area $\tfrac12$), that region is a small triangle with vertices $(0,\tfrac12)$, $(\tfrac12,\tfrac12)$, $(\tfrac12, 1)$, with area $\tfrac18$. So
$$P = \frac{1/8}{1/2} = \frac14.$$`,
    insight: R`Geometric probability: turn random variables into coordinates and the probability into an area.`,
    follow: R`If you break the stick once, then break the longer piece at random, what's the probability? (It's $2\ln2 - 1 \approx 0.386$.)`
  });

  Q({ id: 'pr-socks', topic: 'probability', diff: 5, mins: 12,
    title: 'Socks that match half the time',
    q: R`A drawer contains red and black socks. If you pull out two at random, the probability that they match is exactly $\tfrac12$. What's the smallest possible number of socks? The smallest if the number of black socks must be even?`,
    hints: [
      R`$P(\text{match}) = \dfrac{r(r-1) + b(b-1)}{n(n-1)}$ with $n = r + b$.`,
      R`Simplify the equation $P = \tfrac12$. It reduces to $(r-b)^2 = r + b$.`
    ],
    sol: R`$2[r(r-1) + b(b-1)] = (r+b)(r+b-1)$, which simplifies to
$$(r - b)^2 = r + b.$$
So $n = r + b$ must be a perfect square $k^2$, with $r - b = k$, giving $r = \tfrac{k^2+k}{2}$ and $b = \tfrac{k^2-k}{2}$.

Smallest (with both colours present): $k = 2$, giving $r = 3$, $b = 1$: <b>4 socks</b>. Check: $P = \dfrac{6 + 0}{12} = \tfrac12$ ✓.

$b$ even: $b = \tfrac{k(k-1)}{2}$ is even for $k = 4$ ($b = 6$, $r = 10$): <b>16 socks</b>.`,
    insight: R`Clear denominators and look for structure: a perfect square appeared. Small cases confirm the pattern.`,
    follow: R`How many socks must you pull out in the dark to guarantee a matching pair? A pair of each colour?`
  });

  Q({ id: 'pr-weighing', topic: 'probability', diff: 4, mins: 12,
    title: 'Finding the fake coin',
    q: R`(a) Nine coins look identical, but one is heavier. With a balance, find it in two weighings. (b) Twelve coins, one of which is either heavier <i>or</i> lighter (you don't know which). Find it, and whether it's heavy or light, in three weighings. Why is three the minimum?`,
    hints: [
      R`Each weighing has three outcomes (left, right, balance), so $k$ weighings distinguish up to $3^k$ cases.`,
      R`(b) There are 24 possibilities (12 coins × heavy/light). First weighing: 4 against 4.`
    ],
    sol: R`<b>(a)</b> Weigh 3 against 3. The heavy group (or the 3 left out, if it balances) contains the fake. Weigh 1 against 1 from that group. Done: $3^2 = 9$.

<b>(b)</b> 24 cases, and $3^3 = 27 \ge 24$, so three might be enough (two can't: $9 < 24$). Weigh 1234 against 5678.

• <b>Balances:</b> the fake is in 9–12. Weigh 9,10,11 against 1,2,3 (known good). If it balances, it's 12 (weigh 12 against 1 to get heavy/light). If not, you know whether the fake is heavy or light; weigh 9 against 10.

• <b>Left heavy:</b> either one of 1–4 is heavy or one of 5–8 is light. Weigh 1,2,5 against 3,6,9. Left heavy: 1 or 2 heavy, or 6 light; weigh 1 against 2. Right heavy: 3 heavy or 5 light; weigh 3 against a good coin. Balances: 4 heavy or 7, 8 light; weigh 7 against 8.`,
    insight: R`Information theory: count the outcomes and the possibilities to get a lower bound, then design each weighing to split the cases into thirds.`,
    follow: R`What's the maximum number of coins you can handle in $k$ weighings for the heavy-or-light version? (It's $(3^k - 3)/2$.)`
  });

  Q({ id: 'pr-vonneumann', topic: 'probability', diff: 4, mins: 8,
    title: 'Fair coin from a biased one',
    q: R`You have a coin that lands heads with unknown probability $p \ne \tfrac12$. How can you use it to make a perfectly fair 50:50 decision? What's the expected number of flips? Can you simulate a fair 6-sided die?`,
    hints: [
      R`Flip twice. Which outcomes are equally likely?`,
      R`$P(HT) = P(TH) = p(1-p)$.`
    ],
    sol: R`Flip twice: HT means "heads", TH means "tails", and on HH or TT you start again (von Neumann's trick). Each round succeeds with probability $2p(1-p)$, so the expected number of flips is $\dfrac{2}{2p(1-p)} = \dfrac{1}{p(1-p)}$. That's 4 for a fair coin, and more as $p$ moves further from $\tfrac12$.

Die: generate 3 fair bits to get a number 0–7. Accept 1–6, and reject 0 and 7 and retry (rejection sampling).`,
    insight: R`Exploit symmetry to cancel an unknown bias. This is used in real hardware random-number generators.`,
    follow: R`Can you make an event of probability exactly $\tfrac13$ with a fair coin in a bounded number of flips? (No. Why?)`
  });

  Q({ id: 'pr-hh-ht', topic: 'probability', diff: 4, mins: 10,
    title: 'Waiting for HH versus HT',
    q: R`You flip a fair coin repeatedly. What's the expected number of flips until you first see two heads in a row (HH)? Until you first see HT? Explain intuitively why they differ.`,
    hints: [
      R`Set up states: "start", "just saw H". Write equations for the expected remaining flips from each.`,
      R`For HT: once you've seen an H, you're never sent back to the start.`
    ],
    sol: R`<b>HH:</b> let $E_0$ be the expected flips from the start and $E_1$ from "last flip was H".
$E_0 = 1 + \tfrac12E_1 + \tfrac12E_0$ and $E_1 = 1 + \tfrac12\cdot0 + \tfrac12E_0$. Solving: $E_0 = 6$.

<b>HT:</b> $E_0 = 1 + \tfrac12E_1 + \tfrac12E_0$ and $E_1 = 1 + \tfrac12E_1 + 0$, so $E_1 = 2$ and $E_0 = 4$.

Why they differ: for HT, a failed attempt (HH) still leaves you one step away. For HH, a failure (HT) sends you right back to the start. The patterns <i>overlap with themselves</i> differently.`,
    insight: R`Markov chains / state equations are a general tool for "expected time until" problems.`,
    follow: R`In Penney's game, player one picks HHT; what should player two pick to have the advantage? (THH, which wins 3/4 of the time.)`
  });
})();
