export const civ = {
  name: 'IRIS CIV',
  fullName: 'Interior Reconnaissance and Inference System',
  explainer: 'The first response product that operationally improves police response.',
  heroLabel: 'VIDEO · IRIS CIV HERO · 21:9',
  /* The photo is wider than the screen: keep the officers and the phone (right of the photo's centre) in the middle. */
  heroFocus: '64% 50%',
  meta: {
    title: 'IRIS CIV — Police total response | Initium',
    description: 'Free for police. From the 911 call to a confirmed, tracked assailant on every officer’s screen in sixty seconds.',
  },
  /* The headline promise, from the 911 call to a confirmed threat on every officer's screen. */
  stat: {
    value: '60',
    unit: 'Seconds',
    /* Three fixed lines: the 60 is drawn exactly as tall as these three lines (globals.css .civ-stat). */
    lines: ['From the 911 call to a confirmed,', 'tracked assailant on every', 'responding officer’s screen.'],
  },
  flowLabel: 'Concept of operations',
  /* The alert chain (StepCards). Step 04 has no text: its band holds the officer-view demo (seesImage, sees). */
  steps: [
    {
      tag: 'Call',
      time: '0–5 seconds',
      title: '911 is called',
      text: 'A call lands with the emergency communications center. If the building is IRIS-enrolled, then the system starts up.',
    },
    {
      tag: 'Link',
      time: '5–10 seconds',
      title: 'Officers receive the picture',
      text: 'The call is matched to the building, every dispatched officer receives an IRIS link in the call-out package, on their phone or MDT.',
    },
    {
      tag: 'Verify',
      time: '10–60 seconds',
      title: 'A human verifies the threat',
      text: 'As units head inbound, Initium’s team checks the building’s live cameras and confirms the suspected threat.',
    },
    {
      tag: 'Arrive',
      title: 'The live picture is available',
    },
  ],
  /* Placeholder copy until the real description is written. */
  description: {
    label: 'Description',
    lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  /* A real IRIS CIV screen (demo map of our office; top bar with the server address cropped off). `at` = where each
     numbered point sits on the image, in % from the left and top. */
  seesImage: {
    src: '/media/iris-civ/officer-view.jpg',
    alt: 'IRIS CIV on an officer’s phone: a live floorplan of the ground floor over an aerial photo, people tracked in Room 4, rooms with no camera shaded grey',
  },
  /* The line above the screen (hover on desktop, tap on phones), and the phone caption before a point is opened. */
  seesHint: { hover: 'Hover over a point to explore', tap: 'Tap a point to explore', empty: 'Tap a point on the screen.' },
  sees: [
    { icon: 'layers', text: 'A live floorplan of every level', at: [30.6, 31.9] },
    { icon: 'target', text: 'Every person tracked room to room, the confirmed assailant marked', at: [51.4, 31.6] },
    { icon: 'sight', text: 'What each threat can see, shaded on the map', at: [21.5, 81.2] },
    { icon: 'people', text: 'Everyone still inside, and how many have not come out', at: [59.2, 40.8] },
    { icon: 'eyeoff', text: 'Dead space with no camera, and where each person was last seen', at: [72.6, 46.5] },
  ],
};
