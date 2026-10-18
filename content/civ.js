export const civ = {
  name: 'IRIS CIV',
  fullName: 'Interior Reconnaissance and Inference System · Civilian',
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
    text: 'From the 911 call to a confirmed, tracked assailant on every responding officer’s screen.',
  },
  flowLabel: 'How it works',
  /* Short versions of the alert chain (StepCards). */
  steps: [
    {
      tag: 'Call',
      title: '911 is called',
      text: 'A call lands with the emergency communications center. If the address is enrolled and a threat is identified, IRIS CIV starts on its own.',
    },
    {
      tag: 'Link',
      title: 'Linked to the building',
      text: 'The call is matched to the building. Every dispatched officer gets an IRIS link in the call-out package, on the phone or MDT they already carry. No app, no account.',
    },
    {
      tag: 'Verify',
      title: 'A person confirms the threat',
      text: 'As units go inbound, Initium’s team checks the building’s live cameras and confirms the threat, so officers get a confirmed, tracked assailant, not a guess.',
    },
    {
      tag: 'Arrive',
      title: 'Officers see inside',
      text: 'Before the first unit reaches the door, every officer has a live floorplan of the building. It keeps updating until the incident is closed.',
    },
  ],
  bracket: 'Steps 01–03: under 60 seconds',
  seesLabel: 'What every officer sees',
  /* A real IRIS CIV screen (demo map of our office; top bar with the server address cropped off). `at` = where each
     numbered point sits on the image, in % from the left and top. */
  seesImage: {
    src: '/media/iris-civ/officer-view.jpg',
    alt: 'IRIS CIV on an officer’s phone: a live floorplan of the ground floor over an aerial photo, people tracked in Room 4, rooms with no camera shaded grey',
  },
  sees: [
    { icon: 'layers', text: 'A live floorplan of every level', at: [30.6, 31.9] },
    { icon: 'target', text: 'Every person tracked room to room, the confirmed assailant marked', at: [51.4, 31.6] },
    { icon: 'sight', text: 'What each threat can see, shaded on the map', at: [21.5, 81.2] },
    { icon: 'people', text: 'Everyone still inside, and how many have not come out', at: [59.2, 40.8] },
    { icon: 'eyeoff', text: 'Dead space with no camera, and where each person was last seen', at: [72.6, 46.5] },
  ],
  banner: 'Operational intelligence improves outcomes.',
  pillarsLabel: 'Why police use it',
  pillars: [
    {
      icon: 'shield',
      title: 'Free for police',
      text: 'Free for police and first responders, always. Nothing to install and nothing to pay, on the devices officers already carry.',
    },
    {
      icon: 'scan',
      title: 'Threat detection',
      text: 'Every person tracked across cameras with a live count of who is inside. Weapons, a person down and barred individuals are flagged for human confirmation.',
    },
    {
      icon: 'plug',
      title: 'Integration',
      text: 'Plugs into dispatch through its API and uses the channels police already use. A building is live within two weeks of onboarding.',
    },
  ],
  useCasesLabel: 'Civilian use cases',
  useCases: [
    {
      name: 'Federal and government facilities',
      text: 'Where it is happening, who is involved and who is still inside, confirmed before the first unit arrives.',
    },
    {
      name: 'Schools',
      text: 'Every person on campus accounted for, with a live count of who is still in each building.',
    },
    {
      name: 'High-risk industry',
      text: 'A direct relay to the site’s own security team, and the inside picture ready for responders.',
    },
  ],
};
