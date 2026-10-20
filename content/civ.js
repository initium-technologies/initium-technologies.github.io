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
  /* The alert chain (StepCards). Step 04 has no image: the officer-view demo (seesImage, sees) sits under its band. */
  steps: [
    {
      tag: 'Call',
      title: '911 is called',
      text: 'A call lands with the emergency communications center. If the building is IRIS-enrolled, then the system starts up.',
    },
    {
      tag: 'Link',
      title: 'Officers receive the picture',
      text: 'The call is matched to the building, every dispatched officer receives an IRIS link in the call-out package, on their phone or MDT.',
    },
    {
      tag: 'Verify',
      title: 'A human verifies the threat',
      text: 'As units head inbound, Initium’s team checks the building’s live cameras and confirms the suspected threat.',
    },
    {
      tag: 'Arrive',
      title: 'The live picture is available',
      text: 'See what IRIS puts on an officer’s phone the second they breach a building.',
    },
  ],
  /* The description: a large lead, then the text under it on the left. */
  description: {
    label: 'Description',
    lead: 'IRIS Civ turns a facility’s existing security cameras into a single live floor plan that shows where every person in the building is, in real time. It connects to the cameras a facility already has, detects every person in view, follows each individual as they move from one camera to the next, and places them on a room-by-room plan of the building.',
    text: 'This live picture is pushed to the responding law enforcement agency the moment an incident is detected, the officers who arrive have all the information before they enter.',
  },
  /* The IRIS CIV screen on the officer's phone (demo data). `at` = where each numbered point sits on the image, in %
     from the left and top. */
  seesImage: {
    src: '/media/iris-civ/officer-view.jpg',
    alt: 'IRIS CIV on an officer’s phone: a live floorplan of the ground floor over an aerial photo, the assailant marked red in Room 2, people tracked in Room 4, what the threat can see shaded yellow, rooms with no camera shaded grey',
  },
  /* Phones: the caption under the screen before a point is opened. */
  seesHint: { empty: 'Tap a point on the screen.' },
  sees: [
    { icon: 'layers', text: 'A live floorplan of every level', at: [23.6, 63.2] },
    { icon: 'target', text: 'Every person tracked room to room, the confirmed assailant marked', at: [45.7, 16.2] },
    { icon: 'sight', text: 'What each threat can see, shaded on the map', at: [51.4, 45.9] },
    { icon: 'people', text: 'Everyone still inside, and how many have not come out', at: [60.0, 43.2] },
    { icon: 'eyeoff', text: 'Dead space with no camera, and where each person was last seen', at: [62.9, 31.1] },
  ],
};
