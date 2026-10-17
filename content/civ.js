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
