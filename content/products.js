export const iris = {
  slug: 'iris',
  name: 'IRIS',
  fullName: 'Interior Reconnaissance and Inference System',
  explainer: 'Mission compute for the operator, from the moment of breach.',
  heroLabel: 'IMAGE/VIDEO · IRIS HERO · 21:9',
  meta: {
    title: 'IRIS — Interior Reconnaissance and Inference System | Initium',
    description: 'Mission compute for the operator, from the moment of breach.',
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
  explainer: 'Shipboard compute that turns raw ISR feeds into intelligence before they leave the ship.',
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
  terminal: {
    title: 'Locust Terminal',
    fields: [
      { id: 'identification-code', label: 'Identification code', masked: false },
      { id: 'access-code', label: 'Access code', masked: true },
      { id: 'personal-access-code', label: 'Personal access code', masked: true },
    ],
    enter: 'Enter',
    verifying: 'Verifying',
    invalid: 'Invalid details',
    note: 'ORIN is a confidential product. Please sign in with your Locust Terminal details.',
  },
};
