/* The Locus Terminal login box under the hero (ORIN, MANTIS), after initiumterminal.com. Shown in caps. */
const loginTerminal = {
  title: 'Log in to access',
  fields: [
    { id: 'access-code', label: 'Access code', masked: false },
    { id: 'password', label: 'Password', masked: true },
  ],
  enter: 'Log in',
  verifying: 'Verifying',
  invalid: 'Invalid details',
};

export const iris = {
  slug: 'iris',
  name: 'IRIS',
  fullName: 'Interior Reconnaissance and Inference System',
  explainer: 'A full interior picture for the operator, before engagement.',
  heroLabel: 'IMAGE/VIDEO · IRIS HERO · 21:9',
  meta: {
    title: 'IRIS — Interior Reconnaissance and Inference System | Initium',
    description: 'A full interior picture for the operator, before engagement.',
  },
  /* Under the hero, in order: concept of operations (StepCards; images public/media/iris/step-1…4.*), description,
     environment specification. */
  concept: {
    label: 'Concept of operations',
    /* Titles only on IRIS (no secondary text). */
    steps: [
      {
        tag: 'Camera Access',
        title: 'Access to camera feeds established',
      },
      {
        tag: 'Initial Picture',
        title: 'IRIS builds an initial interior picture',
      },
      {
        tag: 'Refinement',
        title: 'Fidelity increases as intelligence is collected over time',
      },
      {
        tag: 'Assault',
        title: 'The assault element enters with a full visual of the interior',
      },
    ],
  },
  description: {
    label: 'Description',
    lead: 'With access to the camera feed inside a target building established prior by a cyber element or through a hardline connection, IRIS fuses data from the adversary’s own security system to construct a live interior picture for the assault element.',
    text: 'The picture is comprised of a full floorplan with real-time person identification and tracking throughout all visible rooms. The IRIS ruggedized unit is designed to attach to the exterior of an operator’s assault pack, allowing all inference to be conducted on-site with no reach-back, network connectivity or traceable RF signature.',
  },
  specs: {
    caption: 'IRIS ruggedization specs',
    columns: ['Parameter', 'Rating', 'Detail'],
    /* Each row: the parameter, its rating, and the detail behind it. */
    items: [
      { label: 'Operating temperature', figure: '−60°F to +130°F', detail: 'Full operating range.' },
      { label: 'Temperature shock', figure: 'Full range', detail: 'Rapid transition across the full operating range.' },
      { label: 'Altitude', figure: '30,000 ft', detail: 'Operational up to 30,000 ft.' },
      { label: 'Seawater immersion', figure: '30 FSW', detail: 'Operational up to 30 feet of seawater.' },
      { label: 'Drop', figure: '4 ft / 5 ft', detail: 'Logistic / tactical.' },
      { label: 'Sand and dust', figure: 'Operational', detail: 'During and after exposure.' },
      { label: 'Vibration', figure: 'All profiles', detail: 'Tactical ground, rotary-wing and fixed-wing.' },
      { label: 'Salt fog', figure: 'Resistant', detail: 'Maritime environment.' },
      { label: 'EMI / EMC', figure: 'MIL-STD-461G', detail: 'RE102 / RS103 as applicable.' },
    ],
  },
  functions: [
    {
      title: 'On the operator',
      text: 'IRIS is carried, not connected to. A portable compute core worn by a member of the assault element runs the whole system on the operator’s back, with no link to a data center, a vehicle or a satellite. If the network is gone, IRIS is not.',
      label: 'IMAGE · IRIS CORE ON OPERATOR · 4:5',
    },
    {
      title: 'The interior picture',
      text: 'From the building’s own cameras, IRIS builds a live picture of the inside: every level, every person in view, where they are, which way they face and where they went when they left a camera. The picture is on the element’s devices before the door and keeps updating while they are inside.',
      label: 'IMAGE · IRIS INTERIOR VIEW ON DEVICE · 4:5',
    },
    {
      title: 'Built to last',
      text: 'Sealed, shock-rated and silent. The core runs a full operation on its own power, in heat, dust and rain, and is live within seconds of being switched on.',
      label: 'IMAGE · IRIS CORE DETAIL · 4:5',
      confirm: true,
    },
  ],
};

export const mantis = {
  slug: 'mantis',
  name: 'MANTIS',
  fullName: 'Maritime Autonomous Neural Triage and Inference System',
  /* Keep the video's bottom edge (the tracked-objects table) in frame on very wide screens. */
  heroFocus: '50% 100%',
  /* No text under the hero: the Locus Terminal login box instead, as on ORIN. */
  terminal: loginTerminal,
  heroLabel: 'IMAGE/VIDEO · MANTIS HERO · 21:9',
  meta: {
    title: 'MANTIS — Shipboard edge compute for ISR | Initium',
    description: 'Shipboard compute that turns raw ISR feeds into intelligence before they leave the ship.',
  },
  functions: [
    {
      title: 'Aboard the ship',
      text: 'MANTIS is a ruggedized, rack-mounted appliance that fits the ship’s existing equipment spaces, runs on the ship’s own power and chilled water, and connects over standard Ethernet. No structural change, no bespoke cabling, and no shore link needed for it to work.',
      label: 'IMAGE · MANTIS IN RACK · 4:5',
    },
    {
      title: 'The intelligence product',
      text: 'Every unmanned feed the ship receives is triaged on board. Detections, classified tracks, anomalies and annotated clips reach watchstanders and combat systems in seconds, in the formats they already accept. Only the compressed product crosses the satellite link, and in EMCON or denied communications the ship keeps its full exploitation capability.',
      label: 'IMAGE · MANTIS OUTPUT ON WATCHSTANDER DISPLAY · 4:5',
    },
    {
      title: 'Built to the standard',
      text: 'Designed to MIL-STD-810H and MIL-S-901D Grade A shock, with NSA Type 1 encryption and CNSA 2.0 post-quantum compliance, on standard Navy 440V three-phase power. Closed-loop liquid cooling holds full throughput without throttling, and processor modules swap in the rack as accelerators improve.',
      label: 'IMAGE · MANTIS ENCLOSURE DETAIL · 4:5',
    },
  ],
};

export const orin = {
  slug: 'orin',
  name: 'ORIN',
  fullName: 'Orbital Relay Inference Network',
  heroLabel: 'VIDEO · ORIN HERO · 16:9',
  meta: {
    title: 'ORIN | Initium',
    description: 'Orbital Relay Inference Network.',
  },
  terminal: loginTerminal,
};
