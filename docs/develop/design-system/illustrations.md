# Illustrations

Getting Started, the splash and large icons use small 3D objects modelled in code from boxes, cylinders, spheres and capsules. They are drawn like a technical illustration, with palette colours in two flat tones, one line weight for every edge and a flat cast shadow, and a viewer on this page shows each one from any camera.

```summary
Takeaways:
- Every object is built from a few simple solids in code, so changing a colour, a proportion or a part is an edit to one file.
- Each surface has two flat tones. The lit tone is the palette colour; the shade tone is that colour darkened and mixed toward a dark version of the background, so an object on a green ground has green shade and on a lavender ground lavender shade.
- Outlines are found on the rendered image instead of being drawn per part. Where two parts touch or one hides another there is one line, of the same width at any zoom.
- The scenes are a shop in two variants, a London high street corner and a larger crossroads; the objects are a basket, a delivery scooter with a rider and a delivery box. Parts drop in one after another on entry; the awnings and the scooter move a little at rest.
Call:
- I asked for a 3D illustration style for Getting Started, the splash and large icons: simple shapes modelled in code, palette colours, thin technical outlines and solid cel-like shadows, and for a viewer to tune them (decision 042).
- In this round I asked for clean lines where parts meet (no doubled rings, no stray segments, nothing sunk into a wall), a technical-drawing look instead of a cartoon one, shading that follows the background colour, simpler shapes that still read at 64 to 120 px, a new high street corner, and a viewer laid out like Figma whose tools actually move the object.
- In the third round I asked for side panels that collapse (the docs sidebar and the viewer's two panels), the view controls moved to the viewport corners, a review of the shop's awning, a crossroads scene, London street furniture, and a fix for objects that flickered on landing.
- I kept two shop variants side by side so I can choose later: the classic order with the fascia sign above the awning, and one with the awning alone.
- The style is provisional until the objects are seen at real size in the prototype.
AI:
- An agent rebuilt the outline rendering, the shading and the viewer, simplified the four existing objects and modelled the street corner from my notes and close-up screenshots of the problems. I review each object in the viewer and decide what changes.
- In the third round an agent compared the shop with its previous version, rebuilt the awning from it (seven stripes, a roller box, a scalloped edge), modelled the crossroads and the London shop buildings, and traced the flicker: a label or band sitting on a part that squashed was swallowed by that part for a few frames. Another agent modelled the street furniture as separate objects.
Trade-offs:
- Screen-space outlines need a second render of the scene each frame (object ids, surface directions and depth) and two full-screen passes. The agent measured about 10 ms per frame at 2x pixel density on an M1 laptop, inside the 16 ms a 60 fps frame allows.
- Shadows are projected flat onto the ground, so an object never shades itself; the shade tone on faces turned from the light does that job. On the street corner the shadow lies at pavement height, so where it crosses onto the lower road it sits a few centimetres high.
- The viewer loads three.js from a CDN, so it needs a network connection; the app would ship rendered images, not the viewer.
- The street scenes merge the static pieces of each building and each piece of furniture by colour, so the crossroads draws about 230 meshes instead of 500. Where two merged pieces of one colour touch, no line is drawn between them.
```

## Style rules

| Rule | In practice |
| --- | --- |
| Simple forms | A few large boxes, cylinders, spheres, capsules and extruded profiles. Few small parts and almost no rounded bevels, so each object still reads at 64 to 120 px |
| Palette colours only | Fills come from the [colour](colour.md) ramps: pale steps for large surfaces, 500 to 900 for small accents |
| Two tones per surface | Lit faces show the palette colour. Faces turned from the light show the colour × 0.56 × an ambient tint, mixed 36% toward the background's dark tone. The ambient tint is the background's hue; the dark tone is the 800 step of its ramp (900 on Indigo 800), near-black on Biscuit and indigo 900 on the dark grounds |
| Screen-space outlines | After the scene is drawn, one pass compares each pixel's object, surface direction and depth with its neighbours. A line appears at a silhouette, where two parts meet, and where two faces of one part meet at 35° or more. Lines are near-black #1a1714, about 1.25 px, the same width at every zoom; MSAA and FXAA keep curves smooth |
| Parts sit on surfaces | A part touches the surface it belongs to instead of sinking into it, and no two visible faces share a plane, so nothing flickers where they meet |
| Solid shadow | One light, from the upper left unless moved in the viewer. The shadow is a flat shape on the ground in the background's own shade tone; on an object with its own ground, such as the street corner, it darkens that ground by the same rule |
| Isometric view | Objects are shown at the true isometric angle (35.264° elevation, 45° turn); the viewer also offers free orthographic and perspective cameras |
| Motion | On entry, parts drop in order and land with a small squash. A part resting on another squashes with it, so nothing sinks into the part below; ground slabs drop without squashing. Idle motion is slight. With Reduce Motion, the object appears complete and stays still |

Two references shaped these rules. Gooch, Gooch, Shirley and Cohen ("A non-photorealistic lighting model for automatic technical illustration", SIGGRAPH 1998) shade by shifting hue instead of darkening toward black, and outline silhouettes and creases; here the background gives the hue. Saito and Takahashi ("Comprehensible rendering of 3-D shapes", SIGGRAPH 1990) find outlines from discontinuities in depth and normal images of the scene; the outline pass does the same, with an object id added. Colouring shadows from the scene's palette instead of greying them is also common in flat illustration and in games such as Monument Valley.

## Getting started

Each Getting started page shows its object at 240 pt on that page's ground: the crossroads on Indigo (page 1), the shop on Peach (page 2) and the delivery box on Pistachio (page 3). The objects are rendered for their own ground, so shade and shadow mix toward that colour's 900 step (Indigo 900, Peach 900, Pistachio 900; near-black on the dark Indigo 900 page), and on a transparent ground: the page colour blends while the shopper drags, and an opaque square would show its edge mid-swipe. When the grounds were all Indigo, the shop's Indigo 800 parts had to be recoloured to Peach 500 on dark page 2; on the Peach dark tile its own Indigo roof stands apart, so the recolour is gone. Stills ship at @2x and @3x, the entry clips at @2x, and the shop also has its idle loop. The crossroads entry only fit the 300 KB budget once the encoder kept half the frames while parts move and a quarter once the scene settles.

## Category cards

Each category card's still is opaque, rendered on that kind's tile colour, which the pipeline reads from the colour tokens (`shop.accent.<hue>.tile`), so a token change can't leave a still on an old colour. The encoder fails when a still's corner pixel differs from its tile by more than 2 per channel. Every object is framed the same way: without its shadow it is 72% of the card's 120 pt width, or as tall as the room between 12 pt from the top and a baseline at 110 pt allows, standing on that baseline and centred across; its shadow stays inside the square.

## Viewer

Objects are listed on the left and the scene settings are on the right: replay entry, outlines, shadows, grid, auto-rotate, background, and light angle and height. Each panel has a button in its header that hides it, and [ and ] do the same; with the objects panel hidden, the page title floats at the top left and carries the button that brings it back. The docs sidebar collapses the same way, from the button at the left of the top bar or with ⌘\ (Ctrl+\). The viewer and the site remember these choices.

The viewport corners hold the controls. At the bottom left are the tools: Orbit (O), Pan (H, or hold Space) and Zoom (Z), plus Reset view (R); the dragged mouse uses the selected tool, a right-drag pans and the wheel zooms. At the bottom right, the camera (isometric, orthographic, perspective) sits next to the zoom control: −, the zoom level (back to 100%), + and Fit (Shift+1). Frames per second and frame time are at the top right. In the isometric view Orbit turns the object, so the camera keeps the true angle. On a phone the two panels fold into buttons at the top right.

## Objects

| Object | Parts | At rest |
| --- | --- | --- |
| Shop | A British shopfront in the classic order from the top down: cornice, fascia sign, the awning's roller box, then a striped awning with a scalloped edge over the window. Pilasters frame the front, a stall riser sits under the window; a door with a step, a side window, a pot plant, a roof slab and a chimney | The scalloped edge sways a little |
| Shop, no sign | The same shop without the fascia: the roller box takes its place, so the awning sits higher and is the sign | The scalloped edge sways a little |
| High street corner | Five London shops on one block: painted fascias, stock brick, red brick or stucco upper floors with sash windows, a clothes shop with a mannequin in a recessed window and a café with a table and a chalkboard. A raised pavement with a kerb, a zebra crossing with Belisha beacons, centre-line dashes, double yellow lines, a lamp column, a K6 phone box, a pillar box, a litter bin, a bench and a plane tree. A second zebra crosses the side street. Five people: two walk a loop over both zebras (one with a dog on a lead, one with a shopping bag), one sits on the bench, one at the café table and one stands at the clothes shop door | On entry the ground lands first, the shops drop in one after another, then the street furniture and the people; at rest the awnings move very slightly, the two walkers go round, stepping down the kerb at the crossings, and the others shift a little. With Reduce Motion everyone stands still |
| Crossroads | Two high streets crossing, four blocks round the junction with two to four shops each and a small garden behind. Pavements with kerbs on all four corners, a zebra with Belisha beacons on each arm, centre-line dashes, give-way lines and double yellow lines; lamp columns, a phone box, a pillar box, a bus stop, litter bins, benches, plane trees, a clothes shop with a mannequin, a café and an ice-cream shop with tables outside. The block nearest the camera is kept low so the junction stays in view. Six people: three walk round the junction over the four zebras (one with a dog, one with a shopping bag), one sits on a bench, one at a café table and one stands at a shop door | On entry the ground and markings land, the four blocks drop in one after another, then the furniture and the people; at rest the awnings move very slightly, the walkers go round, and the others shift a little. With Reduce Motion everyone stands still |
| Basket | Box body with a band and a rim, an arched handle, a loaf, a bottle and an apple | Still |
| Delivery scooter | Wheels, body, leg shield, seat, handlebar, a crate on the rack, a rider with a round helmet and no face, two wind streaks | Wheels spin, the scooter bobs, the streaks pass |
| Delivery box | A large box with packing tape and a shipping label, and a smaller box on top at an angle | Still |
| People | Five figures drawn like the scooter's rider, with no face: a head, a capsule body or a long coat, capsule arms, legs in two segments (thigh and shin) with a shoe, and a bob, short hair or a hat. One carries a shopping bag, one walks a block-shaped terrier on a lead, one stands. The same figures, scaled down, walk and sit in the two street scenes | Four walk on the spot through the four poses of a walk cycle (contact, down, passing, up): the hips bob with the planted foot, the arms swing against the legs, and a long coat's skirt hangs from the hips, lags the legs and shows only the shin and shoe below its hem. The dog trots, the one standing sways slightly |
| Bread basket | A low round basket with a rim, a round bloomer with three slashes and a baguette lying across it. The Bakery category card | Still |
| Toy train | A wooden engine with a boiler, a cab, a red roof and a chimney, pulling an open wagon of toy blocks on wooden wheels. The Toys category card | Still |
| Butcher's block | A wooden block with a leg of lamb on it, the bone out of the narrow end, and a cleaver stuck upright in the wood. The Butcher category card | Still |
| Fish on ice | A steel tray with a bed of ice and loose cubes, a whole fish on its side and half a lemon. The Fishmonger category card | Still |
| Medicine and plasters | An amber bottle with a white cap and label, a box of plasters with the green pharmacy cross on the lid and one plaster in front. The Chemist category card | Still |
| Film camera | A compact camera: dark body, silver top plate, lens barrel, viewfinder, flash, shutter button and rewind knob. The Cameras category card | Still |
| Pencils and notebook | Three hexagonal pencils in a pot and a closed notebook with an elastic. The Stationery category card | Still |
| Stack of books | Four books, each turned a little, with white page blocks; the top one a paperback in the orange and white bands of a classic Penguin. The Books category card | Still |
| Paper and a pint | A folded newspaper with a headline bar, a picture and lines of text, and a glass pint of milk with a green foil top, as left on a London doorstep. The Newsagent category card | Still |
| Cheese and olives | A cheese wedge with a rind on its curved back and a jar of olives with a lid and a label. The Deli category card | Still |
| Potted plant | A snake plant in a terracotta pot: seven tall pointed leaves over the soil. The Plants category card | The leaves sway slightly |
| Board and dice | A draughts board with four pieces and two dice in front. The Games category card | Still |
