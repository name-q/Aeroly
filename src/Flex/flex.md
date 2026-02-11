AeroUI FLEX COMPONENT SPECIFICATION
AI IMPLEMENTATION GUIDE (TXT VERSION)

⸻

	1.	PURPOSE

Flex is the foundational layout component of AeroUI.

This component is designed primarily for:
	1.	AI-generated UI code
	2.	Developers with basic flexbox knowledge
	3.	Predictable layout behavior without deep CSS understanding

Design philosophy:

Layout should be intention-driven, not CSS-driven.

Flex replaces most manual usage of:
	•	display: flex
	•	align-items
	•	justify-content
	•	margin auto spacer tricks

⸻

	2.	CORE DESIGN PRINCIPLES (IMPORTANT FOR AI)

02.01 DEFAULTS MUST BE SAFE

Default behavior of Flex container:

display: flex
flex-direction: row
align-items: center
min-width: 0

Reason:
	1.	Most layouts are horizontal
	2.	Vertical centering is expected
	3.	Prevent overflow issues

02.02 PROPS REPRESENT INTENT, NOT CSS

AI must interpret props as layout meaning.

Example:

Correct:


Incorrect:
justify-content: space-between

02.03 PREDICTABILITY OVER FLEXIBILITY

Avoid ambiguous flex behavior.

Layout must not change unexpectedly when container size changes.

⸻

	3.	PROPS SPECIFICATION

⸻

03.01 direction

Main axis direction.

Type:
direction = “row” | “column”

Default:
row

⸻

03.02 align (Cross Axis Alignment)

Type:
align = “start” | “center” | “end” | “stretch”

Mapping:

start   -> flex-start
center  -> center
end     -> flex-end
stretch -> stretch

Default:
center

⸻

03.03 justify (Main Axis Distribution)

Type:
justify = “start” | “center” | “end” | “between” | “around” | “evenly”

Mapping:

start    -> flex-start
center   -> center
end      -> flex-end
between  -> space-between
around   -> space-around
evenly   -> space-evenly

⸻

03.04 gap (Preferred Spacing)

Type:
gap = number | “xs” | “sm” | “md” | “lg”

Recommended tokens:

xs = 4
sm = 8
md = 12
lg = 16

Rules:
	1.	AI SHOULD prefer gap over margin
	2.	Children SHOULD NOT use margin for spacing

⸻

03.05 wrap

Type:
wrap = boolean

Behavior:
flex-wrap: wrap

Default:
false

⸻

03.06 flex (Child Layout Control)

STRICT RULES:

flex = 1
Result:
flex: 1 1 auto

flex = number(px)
Result:
flex: 0 0 {px}

flex = “auto”
Result:
flex: 1 1 auto

Reason:

Numeric values represent fixed size.

Example:
<Flex flex={120} />

Means:

fixed 120px width, no grow, no shrink.

This prevents layout instability.

⸻

03.07 full

Type:
full = boolean

Behavior:
width: 100%

⸻

03.08 inline

Type:
inline = boolean

Behavior:
display: inline-flex

⸻

03.09 center (Shortcut)

Type:
center = boolean

Equivalent to:

align=“center”
justify=“center”

⸻

03.10 auto (IMPORTANT — margin:auto abstraction)

This replaces manual usage of:

margin-left: auto
margin-right: auto

Type:
auto = true | “start” | “end” | “both”

Behavior:

true   -> margin: auto
start  -> margin-right: auto
end    -> margin-left: auto
both   -> margin-left: auto AND margin-right: auto

Usage example:
<Flex>
  <Logo />
  <Flex auto />
  <Actions />
</Flex>

Equivalent to spacer behavior.

AI RULE:

AI SHOULD use auto instead of inserting empty spacer elements.

⸻

	4.	LAYOUT SAFETY RULES

⸻

04.01 MIN-WIDTH PROTECTION

Flex container MUST include:

min-width: 0

Reason:
Prevents text overflow bugs.

⸻

04.02 DEFAULT CHILD BEHAVIOR

Children default:

flex-shrink: 0

Prevents icons or buttons from collapsing.

When flex = 1:

flex: 1 1 auto
min-width: 0

⸻

	5.	AI LAYOUT RULES (CRITICAL)

AI generating UI MUST follow:
	1.	Prefer gap over margin.
	2.	Prefer auto over spacer elements.
	3.	Avoid unnecessary nested Flex containers.
	4.	Never output raw flex CSS when Flex component exists.
	5.	Props describe layout intent only.

⸻

	6.	RECOMMENDED PATTERNS

⸻

06.01 Header Layout
<Flex justify="between">
  <Logo />
  <Actions />
</Flex>


⸻

06.02 Spacer Layout
<Flex>
  <Title />
  <Flex auto />
  <Button />
</Flex>


⸻

06.03 Vertical Form Layout
<Flex direction="column" gap="sm">
  <Input />
  <Input />
  <Button />
</Flex>


⸻

06.04 Centered Content
<Flex center full>
  <Spinner />
</Flex>


⸻

	7.	SUMMARY (FOR AI)

AeroUI Flex is an intention-driven layout component designed to simplify flexbox usage for AI-generated interfaces by providing semantic props, safe defaults, and predictable layout behavior.

⸻
