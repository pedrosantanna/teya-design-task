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

## Viewer

Objects are listed on the left and the scene settings are on the right: replay entry, outlines, shadows, grid, auto-rotate, background, and light angle and height. Each panel has a button in its header that hides it, and [ and ] do the same; with the objects panel hidden, the page title floats at the top left and carries the button that brings it back. The docs sidebar collapses the same way, from the button at the left of the top bar or with ⌘\ (Ctrl+\). The viewer and the site remember these choices.

The viewport corners hold the controls. At the bottom left are the tools: Orbit (O), Pan (H, or hold Space) and Zoom (Z), plus Reset view (R); the dragged mouse uses the selected tool, a right-drag pans and the wheel zooms. At the bottom right, the camera (isometric, orthographic, perspective) sits next to the zoom control: −, the zoom level (back to 100%), + and Fit (Shift+1). Frames per second and frame time are at the top right. In the isometric view Orbit turns the object, so the camera keeps the true angle. On a phone the two panels fold into buttons at the top right.

## Objects

| Object | Parts | At rest |
| --- | --- | --- |
| Shop | A British shopfront in the classic order from the top down: cornice, fascia sign, the awning's roller box, then a striped awning with a scalloped edge over the window. Pilasters frame the front, a stall riser sits under the window; a door with a step, a side window, a pot plant, a roof slab and a chimney | The scalloped edge sways a little |
| Shop, no sign | The same shop without the fascia: the roller box takes its place, so the awning sits higher and is the sign | The scalloped edge sways a little |
| High street corner | Five London shops on one block: painted fascias, stock brick, red brick or stucco upper floors with sash windows, a clothes shop with a mannequin in a recessed window and a café with a table and a chalkboard. A raised pavement with a kerb, a zebra crossing with Belisha beacons, centre-line dashes, double yellow lines, a lamp column, a K6 phone box, a pillar box, a litter bin, a bench and a plane tree | On entry the ground lands first, the shops drop in one after another, then the street furniture; at rest the awnings move very slightly |
| Crossroads | Two high streets crossing, four blocks round the junction with two to four shops each and a small garden behind. Pavements with kerbs on all four corners, a zebra with Belisha beacons on each arm, centre-line dashes, give-way lines and double yellow lines; lamp columns, a phone box, a pillar box, a bus stop, litter bins, benches, plane trees, a clothes shop with a mannequin, a café and an ice-cream shop with tables outside. The block nearest the camera is kept low so the junction stays in view | On entry the ground and markings land, the four blocks drop in one after another, then the furniture; at rest the awnings move very slightly |
| Basket | Box body with a band and a rim, an arched handle, a loaf, a bottle and an apple | Still |
| Delivery scooter | Wheels, body, leg shield, seat, handlebar, a crate on the rack, a rider with a round helmet and no face, two wind streaks | Wheels spin, the scooter bobs, the streaks pass |
| Delivery box | A large box with packing tape and a shipping label, and a smaller box on top at an angle | Still |
