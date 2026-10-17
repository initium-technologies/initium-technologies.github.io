export const civ = {
  name: 'IRIS CIV',
  fullName: 'Interior Reconnaissance and Inference System · Civilian',
  explainer: 'The first response product that operationally improves police response.',
  heroLabel: 'VIDEO · IRIS CIV HERO · 21:9',
  meta: {
    title: 'IRIS CIV — Police total response | Initium',
    description: 'Free for police. From the 911 call to a confirmed, tracked assailant on every officer’s screen in sixty seconds.',
  },
  /* The headline promise, from the 911 call to a confirmed threat on every officer's screen. */
  stat: {
    value: '60',
    unit: 'Seconds',
    text: 'From the 911 call to a confirmed, tracked assailant on every responding officer’s screen.',
  },
  flowLabel: 'How it works',
  /* Short versions of the alert chain; icons are drawn in components/CivIcons.jsx. */
  steps: [
    {
      icon: 'phone',
      tag: 'Call',
      title: '911 is called',
      text: 'A call lands with the emergency communications center. If the address is enrolled and a threat is identified, IRIS CIV starts on its own.',
    },
    {
      icon: 'building',
      tag: 'Link',
      title: 'Linked to the building',
      text: 'The call is matched to the building. Every dispatched officer gets an IRIS link in the call-out package, on the phone or MDT they already carry. No app, no account.',
    },
    {
      icon: 'verify',
      tag: 'Verify',
      title: 'A person confirms the threat',
      text: 'As units go inbound, Initium’s team checks the building’s live cameras and confirms the threat, so officers get a confirmed, tracked assailant, not a guess.',
    },
    {
      icon: 'floorplan',
      tag: 'Arrive',
      title: 'Officers see inside',
      text: 'Before the first unit reaches the door, every officer has a live floorplan of the building. It keeps updating until the incident is closed.',
    },
  ],
  bracket: 'Steps 01–03: under 60 seconds',
  seesLabel: 'What every officer sees',
  sees: [
    { icon: 'layers', text: 'A live floorplan of every level' },
    { icon: 'target', text: 'The confirmed assailant, tracked room to room' },
    { icon: 'sight', text: 'Which way they face and what they can see' },
    { icon: 'people', text: 'Everyone still inside, and how many have not come out' },
    { icon: 'eyeoff', text: 'Dead space, and where each person was last seen' },
  ],
  banner: 'Operational intelligence improves outcomes.',
  pillarsLabel: 'Why police use it',
  pillars: [
    {
      icon: 'shield',
      title: 'Free for police',
      text: 'IRIS CIV is free for police and first responders, always. It runs on any device an officer already carries and reaches them the instant a call matches an enrolled building. The agency installs nothing, pays nothing, and gains the full interior intelligence of a building it has never set foot in.',
    },
    {
      icon: 'scan',
      title: 'Threat detection',
      text: 'IRIS detects every person on the camera network, gives each a persistent identity across cameras and holds a running count of who has entered, who has left and who is still inside. It cues a visible weapon, a person down and a person barred from the premises for human confirmation, and projects each tracked person’s line of sight onto the floorplan so officers approach from where they cannot be seen. Where state law permits, it can take a photograph of a named individual and search the entire building for them.',
    },
    {
      icon: 'plug',
      title: 'Integration',
      text: 'IRIS CIV plugs into the emergency communications center’s computer-aided dispatch through its API, holds its own geofenced database of enrolled properties and rides the channels dispatch and officers already use. An enrolled facility is operational within two weeks of onboarding.',
    },
  ],
  useCasesLabel: 'Civilian use cases',
  useCases: [
    {
      name: 'Federal and government facilities',
      text: 'Complete operational intelligence over a facility the moment something goes wrong: where it is happening, who is involved, who is still inside and where, confirmed and pushed to the responding element before they arrive. Incidents end faster because the first unit through the door already knows the building.',
    },
    {
      name: 'Schools',
      text: 'Every person on campus accounted for, continuously: who has entered, who has left and exactly how many remain in each building. A person who should not be there can be flagged the moment they walk in, where state law allows, and police receive the live picture before anyone has to make a call.',
    },
    {
      name: 'High-risk industry',
      text: 'Everything above, plus a direct relay to the site’s own security teams. IRIS alerting follows the site’s operating rhythm, with a heightened posture during peak periods and a lighter one outside them, and the interior picture ready for responders whenever a call is made.',
    },
  ],
};
