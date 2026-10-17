export const civ = {
  name: 'IRIS CIV',
  fullName: 'Interior Reconnaissance and Inference System · Civilian',
  explainer: 'The first response product that operationally improves police response.',
  heroLabel: 'VIDEO · IRIS CIV HERO · 21:9',
  meta: {
    title: 'IRIS CIV — Police total response | Initium',
    description: 'Free for police. From the 911 call to a confirmed, tracked assailant on every officer’s screen in sixty seconds.',
  },
  chain: [
    {
      num: '01',
      title: '911 is called',
      text: 'A 911 call lands with the emergency communications center. If the address is enrolled with IRIS CIV and a threat is identified, IRIS is triggered with no further action from the telecommunicator.',
      field: 'alert',
    },
    {
      num: '02',
      title: 'IRIS CIV links to the address',
      text: 'IRIS CIV’s own geofenced database matches the call to the building. Every officer dispatched receives an IRIS link inside the call-out package they already get, on the phone or MDT they already carry. No app, no account, no download.',
      field: 'link',
    },
    {
      num: '03',
      title: 'Human verification',
      text: 'As units go inbound, Initium’s own team is on the building’s live cameras. They confirm the identified threat on IRIS within sixty seconds, so what reaches the officer is a confirmed, tracked assailant, not a guess.',
      field: 'still',
    },
  ],
  arrival: {
    num: '04',
    title: 'Officers arrive with the inside of the building',
    text: 'Before the first unit stacks on the door, every responding officer is looking at the inside of the building: a live floorplan of every level, the confirmed assailant tracked room to room, which way they face and what they can see, every person still inside and exactly how many have not come out, the dead space where someone could be and where each person was last seen. It keeps updating while officers are inside, and it closes the moment the emergency communications center closes the incident.',
    bold: 'From the 911 call to a confirmed, tracked assailant on every officer’s screen: sixty seconds.',
    field: 'build',
  },
  banner: 'Operational intelligence improves outcomes.',
  list: [
    {
      title: 'Police empowerment',
      text: 'IRIS CIV is free for police and first responders, always. It runs on any device an officer already carries and reaches them the instant a call matches an enrolled building. The agency installs nothing, pays nothing, and gains the full interior intelligence of a building it has never set foot in.',
    },
    {
      title: 'Threat detection',
      text: 'IRIS detects every person on the camera network, gives each a persistent identity across cameras and holds a running count of who has entered, who has left and who is still inside. It cues a visible weapon, a person down and a person barred from the premises for human confirmation, and projects each tracked person’s line of sight onto the floorplan so officers approach from where they cannot be seen. Where state law permits, it can take a photograph of a named individual and search the entire building for them.',
    },
    {
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
