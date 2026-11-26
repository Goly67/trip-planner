/* Baguio Trip 2026 · bus ticket wallet
   Self-contained: add <script src="tickets.js" defer></script> before </body>.
   Needs the tickets/ folder (original receipt images) next to index.html. */
(() => {
  'use strict';

  /* ---------------- ticket data (from the Victory Liner receipts) ---------------- */
  const TRIPS = [
    {
      id: 'out', from: 'Pasay', to: 'Baguio', date: '2026-11-26', time: '16:15',
      klass: 'First Class', booking: 'VLI-2026103013362KH39A', fare: 1176,
      tickets: [
        { id: 'out-michael', name: 'Michael Pacomeos Yujoco', seat: 4, inv: 'INV000000054338' },
        { id: 'out-sam', name: 'Sam Lustiva Yujoco', seat: 7, inv: 'INV000000054340' },
        { id: 'out-shane', name: 'Shane Lustiva Yujoco', seat: 11, inv: 'INV000000054343' },
      ],
    },
    {
      id: 'ret', from: 'Baguio', to: 'Pasay', date: '2026-11-29', time: '06:15',
      klass: 'First Class', booking: 'VLI-202611161212FJL830', fare: 1176,
      tickets: [
        { id: 'ret-michael', name: 'Michael Pacomeo Yujoco', seat: 4, inv: 'INV000000196003' },
        { id: 'ret-jasmin', name: 'Jasmin Lustiva Yujoco', seat: 5, inv: 'INV000000196004' },
        { id: 'ret-shane', name: 'Shane Lustiva Yujoco', seat: 13, inv: 'INV000000196007' },
        { id: 'ret-sam', name: 'Sam Lustiva Yujoco', seat: 14, inv: 'INV000000196008' },
      ],
    },
  ];
  /* QR codes re-drawn as vectors from the receipts (same content, verified to scan identically) */
  const QR = {
 "out-shane": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m2 0h1m3 0h2m2 0h1m1 0h1m3 0h2m1 0h7m-33 1h1m5 0h1m2 0h1m3 0h3m1 0h1m3 0h1m2 0h1m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h4m1 0h2m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m3 0h3m3 0h1m5 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h2m3 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m2 0h2m2 0h2m1 0h1m1 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h1m1 0h3m1 0h2m2 0h1m2 0h2m1 0h1m-25 1h1m1 0h5m6 0h1m1 0h1m1 0h2m5 0h1m1 0h5m-31 1h3m1 0h2m2 0h3m3 0h1m1 0h1m2 0h5m1 0h3m2 0h1m1 0h1m-32 1h2m1 0h1m1 0h1m1 0h1m1 0h2m3 0h2m1 0h1m1 0h3m2 0h2m1 0h2m1 0h1m-32 1h2m1 0h3m3 0h1m1 0h2m1 0h1m6 0h3m3 0h1m2 0h1m1 0h1m-27 1h1m1 0h1m1 0h1m4 0h1m2 0h2m5 0h1m1 0h1m1 0h1m-30 1h4m1 0h1m1 0h2m1 0h2m1 0h4m3 0h5m4 0h2m1 0h1m-28 1h2m1 0h1m1 0h1m8 0h1m1 0h2m1 0h2m1 0h2m1 0h2m-32 1h2m2 0h2m1 0h1m1 0h2m1 0h3m1 0h1m2 0h3m2 0h1m1 0h1m2 0h3m-32 1h2m2 0h1m1 0h1m2 0h4m4 0h4m6 0h2m-27 1h1m1 0h2m5 0h2m3 0h4m1 0h4m1 0h1m2 0h2m1 0h1m-33 1h1m3 0h5m2 0h1m2 0h4m2 0h3m3 0h3m1 0h2m-30 1h3m2 0h2m1 0h2m2 0h1m1 0h3m1 0h2m2 0h2m4 0h1m1 0h1m-33 1h1m1 0h1m3 0h1m2 0h1m4 0h3m2 0h1m5 0h1m3 0h1m-30 1h3m2 0h1m3 0h1m1 0h1m3 0h1m1 0h2m3 0h4m3 0h2m1 0h1m-33 1h1m1 0h2m1 0h2m1 0h2m1 0h2m2 0h2m4 0h1m2 0h4m2 0h2m-32 1h1m2 0h2m2 0h1m3 0h1m3 0h1m5 0h1m2 0h2m2 0h1m1 0h2m-32 1h1m1 0h1m2 0h2m1 0h3m3 0h4m6 0h6m-22 1h3m2 0h1m4 0h2m1 0h2m1 0h1m3 0h1m1 0h1m1 0h1m-33 1h7m3 0h2m2 0h2m2 0h1m1 0h1m1 0h3m1 0h1m1 0h1m2 0h1m-32 1h1m5 0h1m1 0h1m1 0h1m5 0h1m2 0h1m1 0h1m1 0h2m3 0h1m1 0h1m-31 1h1m1 0h3m1 0h1m1 0h1m1 0h4m1 0h1m2 0h1m5 0h6m-30 1h1m1 0h3m1 0h1m1 0h1m1 0h4m1 0h2m4 0h3m1 0h1m2 0h1m1 0h3m-33 1h1m1 0h3m1 0h1m1 0h3m7 0h1m1 0h2m2 0h1m1 0h2m1 0h1m-30 1h1m5 0h1m3 0h1m1 0h3m1 0h1m2 0h1m1 0h3m2 0h3m1 0h1m-31 1h7m1 0h2m2 0h3m2 0h1m4 0h1m1 0h1m6 0h1\"/></svg>",
 "out-sam": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m1 0h1m1 0h2m2 0h5m2 0h1m1 0h2m1 0h7m-33 1h1m5 0h1m5 0h1m4 0h1m1 0h1m6 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m2 0h5m1 0h2m4 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h1m2 0h2m1 0h1m1 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m2 0h4m3 0h7m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h5m3 0h2m1 0h1m2 0h1m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h3m4 0h3m3 0h1m1 0h1m-24 1h1m3 0h1m1 0h7m1 0h1m1 0h2m1 0h3m3 0h5m2 0h1m-32 1h2m2 0h1m2 0h1m1 0h2m1 0h1m1 0h1m2 0h1m3 0h3m5 0h2m-31 1h2m3 0h4m5 0h3m2 0h2m1 0h4m1 0h1m1 0h2m-32 1h1m1 0h2m5 0h1m1 0h2m1 0h1m1 0h3m2 0h1m1 0h1m4 0h2m1 0h2m-33 1h1m5 0h1m2 0h3m1 0h2m3 0h1m1 0h2m1 0h1m2 0h1m2 0h1m1 0h2m-33 1h2m2 0h1m2 0h1m1 0h1m2 0h2m2 0h1m2 0h1m2 0h6m2 0h2m-32 1h1m2 0h1m2 0h1m3 0h2m4 0h4m1 0h1m1 0h1m2 0h2m1 0h3m-32 1h4m3 0h1m1 0h1m7 0h1m1 0h5m1 0h1m2 0h2m1 0h1m-32 1h3m1 0h3m1 0h3m1 0h2m1 0h4m2 0h2m2 0h5m1 0h2m-32 1h3m1 0h1m1 0h3m5 0h1m1 0h2m1 0h1m2 0h3m3 0h3m-31 1h1m3 0h5m5 0h1m2 0h1m1 0h2m1 0h1m2 0h3m1 0h2m-29 1h3m1 0h1m2 0h3m1 0h3m3 0h3m2 0h1m2 0h2m-29 1h1m4 0h3m2 0h1m1 0h2m1 0h1m3 0h2m4 0h2m1 0h1m1 0h1m-32 1h1m1 0h1m4 0h1m1 0h6m2 0h4m1 0h3m1 0h2m3 0h1m-29 1h2m1 0h1m5 0h1m2 0h1m1 0h2m3 0h2m1 0h5m1 0h1m-30 1h1m2 0h1m1 0h4m2 0h1m1 0h4m2 0h3m1 0h1m5 0h1m-32 1h2m1 0h6m2 0h2m3 0h6m2 0h5m2 0h2m-25 1h2m1 0h1m2 0h2m4 0h1m1 0h3m3 0h3m-31 1h7m1 0h1m2 0h2m1 0h2m1 0h1m6 0h1m1 0h1m1 0h1m1 0h1m-31 1h1m5 0h1m2 0h1m1 0h3m2 0h3m2 0h4m3 0h2m-30 1h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h1m3 0h1m1 0h2m2 0h6m2 0h1m-33 1h1m1 0h3m1 0h1m6 0h2m1 0h1m2 0h2m1 0h2m1 0h2m1 0h1m1 0h1m-31 1h1m1 0h3m1 0h1m3 0h3m1 0h1m1 0h1m1 0h1m6 0h2m1 0h1m1 0h1m-31 1h1m5 0h1m2 0h1m3 0h1m3 0h1m3 0h1m2 0h1m1 0h2m1 0h1m-30 1h7m1 0h4m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m2 0h3m5 0h1\"/></svg>",
 "out-michael": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m6 0h1m2 0h5m2 0h2m1 0h7m-33 1h1m5 0h1m2 0h1m1 0h7m2 0h2m2 0h1m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h4m1 0h1m1 0h2m2 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h3m2 0h2m5 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m1 0h1m2 0h1m2 0h1m3 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h3m1 0h6m2 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h5m2 0h1m2 0h1m2 0h2m1 0h1m-25 1h1m1 0h5m3 0h4m1 0h1m1 0h2m1 0h1m3 0h1m1 0h5m-26 1h1m1 0h4m3 0h1m1 0h1m2 0h1m1 0h3m1 0h3m4 0h1m-31 1h1m3 0h5m1 0h1m2 0h1m2 0h1m2 0h2m1 0h4m2 0h2m-32 1h2m2 0h2m1 0h1m2 0h3m1 0h3m2 0h1m1 0h2m7 0h1m-31 1h2m1 0h1m2 0h1m2 0h1m1 0h1m3 0h1m2 0h1m6 0h1m1 0h1m1 0h1m-30 1h2m2 0h1m4 0h2m2 0h5m2 0h5m5 0h3m-32 1h8m1 0h1m2 0h1m4 0h2m1 0h2m1 0h1m2 0h2m-29 1h2m1 0h3m1 0h2m7 0h1m2 0h3m2 0h3m2 0h3m-32 1h2m1 0h5m1 0h1m1 0h2m3 0h4m4 0h1m2 0h2m3 0h1m-33 1h6m2 0h1m1 0h1m2 0h1m3 0h7m2 0h1m3 0h3m-32 1h2m1 0h4m3 0h2m1 0h4m2 0h3m1 0h1m1 0h2m2 0h1m-31 1h1m2 0h2m3 0h3m2 0h6m1 0h2m1 0h1m1 0h1m4 0h2m-32 1h3m1 0h1m1 0h2m2 0h1m3 0h3m2 0h1m5 0h1m3 0h1m2 0h1m-33 1h4m4 0h2m5 0h1m1 0h2m2 0h5m3 0h4m-33 1h1m3 0h3m1 0h1m1 0h3m1 0h3m4 0h2m1 0h4m2 0h1m-31 1h1m1 0h1m1 0h2m1 0h1m2 0h2m1 0h1m1 0h1m5 0h1m2 0h2m2 0h4m-32 1h1m1 0h2m1 0h6m3 0h4m6 0h5m-21 1h4m2 0h1m3 0h2m1 0h4m3 0h1m1 0h3m-33 1h7m2 0h1m3 0h1m1 0h2m1 0h1m2 0h4m1 0h1m1 0h2m-30 1h1m5 0h1m1 0h3m1 0h2m2 0h1m4 0h2m1 0h1m3 0h1m1 0h1m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m4 0h1m1 0h1m2 0h1m5 0h6m1 0h1m-32 1h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h3m5 0h4m1 0h6m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h2m2 0h1m3 0h1m1 0h2m1 0h1m-27 1h1m5 0h1m3 0h1m5 0h1m1 0h1m2 0h1m1 0h1m2 0h2m2 0h1m-31 1h7m1 0h1m1 0h2m4 0h5m3 0h1m2 0h2m2 0h1\"/></svg>",
 "ret-shane": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m1 0h3m3 0h4m2 0h1m2 0h2m1 0h7m-33 1h1m5 0h1m3 0h1m5 0h2m1 0h1m1 0h1m2 0h1m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m2 0h1m1 0h2m3 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m3 0h2m1 0h2m1 0h1m1 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h5m3 0h7m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m2 0h3m2 0h1m2 0h1m2 0h1m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h2m1 0h1m3 0h4m2 0h1m-22 1h1m3 0h1m1 0h5m1 0h1m3 0h4m1 0h1m3 0h5m2 0h1m-33 1h4m4 0h1m3 0h4m4 0h1m1 0h3m5 0h1m-29 1h1m2 0h4m2 0h2m2 0h3m2 0h1m2 0h1m1 0h6m-30 1h2m1 0h2m2 0h2m1 0h2m1 0h1m2 0h2m2 0h1m5 0h3m1 0h1m-31 1h1m2 0h3m1 0h4m1 0h2m3 0h1m1 0h2m4 0h1m2 0h1m1 0h2m-31 1h1m5 0h1m1 0h1m1 0h2m2 0h1m2 0h1m2 0h6m2 0h1m-26 1h2m1 0h1m5 0h1m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m2 0h1m-30 1h1m1 0h1m1 0h1m2 0h1m2 0h1m2 0h1m2 0h7m1 0h2m1 0h1m2 0h1m-29 1h1m1 0h2m1 0h1m4 0h3m1 0h2m2 0h2m1 0h5m3 0h1m-33 1h1m1 0h2m1 0h1m1 0h1m1 0h10m1 0h1m2 0h1m1 0h1m4 0h1m-31 1h1m1 0h6m1 0h3m1 0h1m1 0h2m1 0h1m1 0h5m1 0h2m1 0h2m-31 1h4m1 0h1m3 0h1m1 0h1m1 0h1m1 0h1m4 0h2m2 0h2m1 0h3m1 0h2m-33 1h1m2 0h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m3 0h2m4 0h2m1 0h1m2 0h1m-33 1h2m6 0h2m1 0h2m1 0h1m2 0h4m1 0h3m1 0h2m2 0h2m-29 1h7m2 0h1m2 0h1m1 0h2m2 0h1m1 0h1m1 0h4m1 0h2m-30 1h1m1 0h2m3 0h1m2 0h2m1 0h4m2 0h1m1 0h1m1 0h1m5 0h1m-32 1h2m1 0h1m2 0h1m1 0h1m4 0h1m3 0h1m1 0h4m1 0h5m2 0h2m-25 1h1m2 0h1m1 0h4m1 0h1m1 0h1m2 0h2m3 0h3m-31 1h7m1 0h1m4 0h1m1 0h3m4 0h1m1 0h1m1 0h1m1 0h3m-31 1h1m5 0h1m4 0h1m3 0h5m1 0h4m3 0h1m2 0h1m-32 1h1m1 0h3m1 0h1m1 0h3m1 0h3m3 0h4m2 0h5m2 0h2m-33 1h1m1 0h3m1 0h1m2 0h1m4 0h1m1 0h1m2 0h2m1 0h5m1 0h1m1 0h1m-31 1h1m1 0h3m1 0h1m2 0h5m2 0h1m3 0h1m4 0h2m1 0h3m-31 1h1m5 0h1m2 0h1m1 0h1m2 0h1m2 0h1m1 0h4m1 0h1m1 0h2m1 0h1m-30 1h7m1 0h1m5 0h6m1 0h1m2 0h3m5 0h1\"/></svg>",
 "ret-sam": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m2 0h1m1 0h1m1 0h2m2 0h1m1 0h1m1 0h1m1 0h2m1 0h7m-33 1h1m5 0h1m3 0h8m8 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m3 0h1m2 0h3m1 0h2m2 0h1m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h3m3 0h1m5 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m6 0h1m2 0h1m3 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m1 0h1m1 0h5m3 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h1m2 0h2m1 0h2m2 0h1m2 0h4m-25 1h1m1 0h5m2 0h1m1 0h1m1 0h1m1 0h4m5 0h1m1 0h5m-30 1h2m4 0h6m1 0h1m4 0h5m2 0h1m5 0h1m-31 1h3m1 0h1m2 0h4m2 0h2m1 0h1m1 0h1m1 0h1m1 0h3m3 0h2m-32 1h2m1 0h3m1 0h1m1 0h3m2 0h3m4 0h2m4 0h2m1 0h2m-32 1h2m4 0h1m1 0h1m1 0h1m4 0h1m2 0h2m5 0h1m1 0h1m1 0h1m1 0h1m-29 1h1m4 0h2m2 0h1m1 0h4m2 0h5m5 0h3m-31 1h6m5 0h1m4 0h2m1 0h2m1 0h2m1 0h4m-31 1h1m3 0h1m7 0h1m1 0h1m1 0h1m1 0h4m2 0h1m1 0h1m2 0h3m-32 1h1m1 0h2m2 0h1m1 0h2m1 0h1m4 0h5m7 0h1m-28 1h3m3 0h2m2 0h1m2 0h1m2 0h3m1 0h4m1 0h2m1 0h4m-33 1h7m1 0h3m2 0h5m2 0h2m2 0h1m1 0h1m2 0h2m-28 1h1m1 0h1m1 0h2m3 0h3m2 0h2m1 0h3m1 0h2m1 0h2m1 0h1m1 0h1m-32 1h1m2 0h1m1 0h1m4 0h3m1 0h2m2 0h1m3 0h1m1 0h1m3 0h1m-30 1h3m2 0h1m1 0h2m2 0h5m1 0h2m2 0h5m4 0h1m1 0h1m-33 1h1m4 0h2m1 0h1m5 0h3m5 0h1m1 0h4m1 0h3m-32 1h1m2 0h1m5 0h1m1 0h1m2 0h2m5 0h1m2 0h2m2 0h4m-32 1h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h2m5 0h5m-21 1h2m2 0h3m1 0h1m2 0h1m1 0h4m3 0h1m1 0h3m-33 1h7m3 0h2m3 0h2m1 0h1m1 0h1m2 0h2m1 0h1m1 0h2m-30 1h1m5 0h1m1 0h2m2 0h2m1 0h2m2 0h1m1 0h1m2 0h1m3 0h1m1 0h3m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h2m1 0h2m2 0h1m5 0h6m-30 1h1m1 0h3m1 0h1m1 0h5m1 0h3m5 0h1m1 0h2m2 0h1m1 0h3m-33 1h1m1 0h3m1 0h1m1 0h4m1 0h2m2 0h1m3 0h1m1 0h2m1 0h2m1 0h2m-31 1h1m5 0h1m2 0h4m3 0h1m4 0h1m1 0h1m2 0h1m3 0h1m-31 1h7m1 0h2m2 0h3m2 0h1m1 0h1m2 0h1m1 0h1m6 0h1\"/></svg>",
 "ret-jasmin": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m2 0h1m1 0h1m1 0h2m2 0h5m1 0h2m1 0h7m-33 1h1m5 0h1m2 0h1m1 0h5m1 0h1m6 0h1m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m2 0h1m3 0h3m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h2m1 0h3m3 0h1m5 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m1 0h2m1 0h1m2 0h1m3 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h1m2 0h2m2 0h2m3 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h2m1 0h2m1 0h2m5 0h4m-25 1h1m1 0h5m3 0h9m7 0h5m-31 1h1m1 0h1m1 0h1m3 0h3m1 0h1m6 0h6m1 0h1m2 0h2m1 0h1m-32 1h4m1 0h2m1 0h2m1 0h1m2 0h1m2 0h1m3 0h1m2 0h4m1 0h2m-31 1h1m1 0h1m4 0h1m1 0h1m1 0h1m1 0h1m6 0h4m5 0h1m1 0h1m-30 1h2m1 0h1m3 0h1m4 0h1m2 0h2m5 0h1m1 0h1m1 0h1m-30 1h2m2 0h2m1 0h2m2 0h2m1 0h3m3 0h5m5 0h1m1 0h1m-29 1h1m1 0h1m1 0h1m1 0h1m3 0h1m4 0h1m1 0h2m1 0h1m2 0h2m2 0h1m-30 1h1m2 0h1m2 0h1m1 0h4m2 0h1m2 0h3m2 0h1m1 0h1m2 0h2m1 0h1m-30 1h5m1 0h1m2 0h2m3 0h4m1 0h1m5 0h1m-28 1h1m1 0h3m1 0h1m1 0h1m2 0h3m1 0h4m1 0h1m1 0h2m1 0h2m1 0h4m-33 1h2m2 0h3m3 0h3m2 0h1m1 0h1m2 0h2m4 0h4m-30 1h1m1 0h3m2 0h1m3 0h1m4 0h3m1 0h3m1 0h2m4 0h2m-31 1h1m2 0h13m2 0h1m3 0h1m1 0h1m3 0h1m-30 1h1m3 0h2m1 0h4m2 0h1m1 0h1m1 0h2m2 0h5m3 0h2m1 0h1m-33 1h1m1 0h1m3 0h2m3 0h2m2 0h2m7 0h4m2 0h2m-32 1h1m3 0h1m2 0h1m2 0h1m3 0h2m5 0h1m2 0h2m2 0h1m1 0h2m-32 1h1m2 0h4m1 0h2m2 0h1m1 0h2m1 0h2m5 0h6m-22 1h1m2 0h3m2 0h1m2 0h1m1 0h4m3 0h3m1 0h1m-33 1h7m3 0h1m1 0h5m1 0h1m1 0h1m2 0h2m1 0h1m1 0h2m1 0h1m-32 1h1m5 0h1m1 0h4m2 0h3m2 0h3m2 0h1m3 0h1m1 0h1m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m2 0h5m2 0h1m5 0h6m-30 1h1m1 0h3m1 0h1m1 0h1m1 0h8m4 0h1m1 0h2m1 0h6m-33 1h1m1 0h3m1 0h1m1 0h3m2 0h1m4 0h1m2 0h1m1 0h2m1 0h1m3 0h1m-31 1h1m5 0h1m2 0h1m2 0h3m1 0h1m3 0h2m1 0h1m2 0h1m3 0h1m-31 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m3 0h1m2 0h2m2 0h1\"/></svg>",
 "ret-michael": "<svg xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\" aria-hidden=\"true\" viewBox=\"0 0 41 41\"><path stroke=\"#000\" d=\"M4 4.5h7m3 0h1m1 0h3m2 0h5m1 0h2m1 0h7m-33 1h1m5 0h1m2 0h2m1 0h4m1 0h1m2 0h1m5 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m1 0h3m3 0h3m1 0h1m4 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h3m3 0h1m5 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h3m1 0h1m2 0h1m2 0h1m3 0h3m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m1 0h4m1 0h6m1 0h3m1 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-25 1h1m2 0h1m3 0h1m5 0h4m-25 1h1m1 0h5m3 0h1m1 0h2m1 0h1m1 0h1m6 0h1m1 0h5m-30 1h4m2 0h1m1 0h2m3 0h1m1 0h1m1 0h6m2 0h1m5 0h1m-31 1h1m1 0h4m2 0h3m2 0h2m1 0h1m3 0h1m2 0h2m3 0h2m-30 1h1m2 0h1m1 0h1m1 0h2m3 0h2m5 0h3m6 0h2m-32 1h2m3 0h7m3 0h1m2 0h2m5 0h1m1 0h1m1 0h1m-28 1h4m2 0h9m3 0h5m4 0h4m-33 1h2m1 0h1m1 0h3m4 0h3m2 0h3m1 0h2m1 0h1m2 0h4m-31 1h1m1 0h3m2 0h1m1 0h2m3 0h1m1 0h1m1 0h4m2 0h3m3 0h1m-31 1h1m1 0h1m1 0h3m1 0h3m1 0h3m2 0h4m7 0h2m-30 1h1m8 0h1m1 0h1m4 0h4m1 0h4m1 0h2m2 0h3m-31 1h1m3 0h5m2 0h1m1 0h3m2 0h2m2 0h1m1 0h2m2 0h1m-31 1h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h6m4 0h3m-31 1h1m1 0h1m1 0h1m1 0h3m2 0h1m1 0h2m2 0h1m5 0h1m3 0h1m-30 1h4m1 0h1m1 0h5m1 0h3m1 0h2m3 0h4m3 0h4m-33 1h1m3 0h1m1 0h1m3 0h3m2 0h2m4 0h1m2 0h4m1 0h2m-31 1h1m1 0h1m5 0h1m1 0h2m3 0h1m5 0h1m2 0h2m2 0h1m1 0h2m-32 1h1m3 0h1m1 0h1m1 0h1m1 0h4m1 0h3m4 0h1m1 0h6m-22 1h1m9 0h2m1 0h1m2 0h1m3 0h5m-33 1h7m2 0h1m2 0h2m1 0h2m1 0h1m4 0h2m1 0h1m1 0h1m-29 1h1m5 0h1m1 0h2m1 0h3m2 0h1m4 0h1m1 0h2m3 0h1m1 0h1m1 0h1m-33 1h1m1 0h3m1 0h1m1 0h2m3 0h3m2 0h2m4 0h6m1 0h1m-32 1h1m1 0h3m1 0h1m1 0h1m1 0h2m2 0h3m4 0h2m1 0h1m3 0h5m-33 1h1m1 0h3m1 0h1m1 0h5m1 0h1m2 0h2m1 0h1m1 0h1m1 0h4m2 0h1m-31 1h1m5 0h1m4 0h1m1 0h1m2 0h1m2 0h1m1 0h1m1 0h1m2 0h2m2 0h1m-31 1h7m1 0h3m2 0h1m2 0h3m1 0h1m3 0h1m2 0h1m3 0h1\"/></svg>"
};

  /* ---------------- helpers ---------------- */
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = {
    ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    bus: '<path d="M4 6 2 7"/><path d="M10 6h4"/><path d="m22 7-2-1"/><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M8 15h.01"/><path d="M16 15h.01"/><path d="M6 19v2"/><path d="M18 21v-2"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    seat: '<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  };
  const ic = (n, cls = '') => `<svg class="tk-ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
  const departAt = t => new Date(`${t.date}T${t.time}:00+08:00`);
  const fmtDate = t => departAt(t).toLocaleDateString('en-US', { timeZone: 'Asia/Manila', weekday: 'short', month: 'short', day: 'numeric' });
  const fmtTime = t => departAt(t).toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit' });
  const peso = n => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2 });
  const first = n => n.split(' ')[0];
  function status(t) {
    const d = departAt(t) - Date.now(), m = Math.round(d / 60000);
    if (m > 2 * 1440) return { txt: `In ${Math.round(m / 1440)} days`, s: 'later' };
    if (m > 1440) return { txt: 'Tomorrow', s: 'later' };
    if (m > 60) return { txt: `In ${Math.floor(m / 60)}h ${m % 60}m`, s: 'soon' };
    if (m > 0) return { txt: `Boarding · ${m} min`, s: 'now' };
    if (m > -420) return { txt: 'On the road', s: 'road' };
    return { txt: 'Done', s: 'done' };
  }
  const defaultTrip = () => (Date.now() < departAt(TRIPS[0]).getTime() + 10 * 3600e3 ? 'out' : 'ret');
  const store = {
    get() { try { return JSON.parse(localStorage.getItem('tk.last')) || {}; } catch { return {}; } },
    set(trip, id) { try { const v = store.get(); v[trip] = id; localStorage.setItem('tk.last', JSON.stringify(v)); } catch {} },
  };

  /* ---------------- styles ---------------- */
  const css = `
.tk-ic{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.tk-top{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:99px;border:1px solid color-mix(in srgb,var(--amber) 45%,transparent);background:color-mix(in srgb,var(--amber) 14%,transparent);color:var(--amber);font:600 13px var(--body);white-space:nowrap;transition:transform .3s var(--spring),background .2s}
.tk-top:hover{transform:translateY(-2px);background:color-mix(in srgb,var(--amber) 22%,transparent)}
.tk-top .tk-ic{width:16px;height:16px}
.tk-topgrp{display:flex;align-items:center;gap:8px}
@media (max-width:400px){.tk-top span{display:none}.tk-top{padding:8px}}

/* page section */
.tk-sec{padding-block:24px 40px}
.tk-trips{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.tk-trip{position:relative;padding:20px;border-radius:22px;background:var(--pine);border:1px solid var(--line);overflow:hidden}
.tk-trip::after{content:"";position:absolute;right:-40px;top:-40px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--tc) 30%,transparent),transparent 70%);pointer-events:none}
.tk-th{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
.tk-route{display:flex;align-items:center;gap:10px;font:800 26px/1 var(--display);letter-spacing:-.02em}
.tk-route .tk-ic{width:20px;height:20px;color:var(--tc)}
.tk-when{margin:6px 0 0;font:500 12px var(--mono);color:var(--mist)}
.tk-class{position:relative;display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:99px;font:700 10.5px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#21180a;background:linear-gradient(110deg,#e9b44c 0%,#ffe3a1 45%,#e9b44c 55%,#c98f2a 100%);background-size:250% 100%;animation:tkShine 3.2s linear infinite;white-space:nowrap}
@keyframes tkShine{from{background-position:100% 0}to{background-position:-150% 0}}
.tk-chip{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:99px;font:600 11px var(--mono);background:rgba(255,255,255,.06);color:var(--mist);white-space:nowrap}
.tk-chip .tk-ic{width:12px;height:12px}
.tk-chip[data-s=soon]{color:var(--amber)}
.tk-chip[data-s=now]{background:var(--berry);color:#fff;animation:tkPulse 1.4s infinite}
.tk-chip[data-s=road]{color:var(--moss)}
@keyframes tkPulse{50%{box-shadow:0 0 0 6px rgba(255,79,109,0)}0%{box-shadow:0 0 0 0 rgba(255,79,109,.6)}}
.tk-pax{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.tk-row{width:100%;display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:14px;border:1px solid transparent;background:rgba(255,255,255,.03);text-align:left;transition:background .2s,border-color .2s,transform .3s var(--spring)}
.tk-row:hover{background:rgba(255,255,255,.07);border-color:var(--line);transform:translateX(4px)}
.tk-seat{display:grid;place-items:center;min-width:44px;height:40px;padding:0 6px;border-radius:11px;background:var(--tc);color:var(--night);font:800 18px/1 var(--display);font-variant-numeric:tabular-nums}
.tk-row b{display:block;font:600 15px var(--body)}
.tk-row small{font:500 11px var(--mono);color:var(--dim)}
.tk-row .tk-ic{margin-left:auto;color:var(--dim)}
.tk-cta{margin-top:14px;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;border-radius:13px;border:0;background:var(--tc);color:var(--night);font:700 14px var(--body);transition:transform .25s var(--spring),filter .2s}
.tk-cta:hover{transform:translateY(-2px);filter:brightness(1.08)}
@media (max-width:760px){.tk-trips{grid-template-columns:minmax(0,1fr)}}

/* wallet */
.tk-wallet{position:fixed;inset:0;z-index:1000;display:flex;flex-direction:column;background:radial-gradient(700px 260px at 50% 0%,color-mix(in srgb,var(--tc) 16%,transparent),transparent 70%),var(--night);color:var(--fog);
  padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px);overflow-y:auto;overscroll-behavior:contain;
  clip-path:circle(0 at var(--ox,90%) var(--oy,30px));transition:clip-path .7s cubic-bezier(.7,0,.2,1),background .6s}
.tk-wallet.open{clip-path:circle(150% at var(--ox,90%) var(--oy,30px))}
.tk-wh{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px max(16px,env(safe-area-inset-right,0px)) 6px max(16px,env(safe-area-inset-left,0px))}
.tk-wh h2{margin:0;font:800 22px var(--display);letter-spacing:-.02em;display:flex;align-items:center;gap:9px}
.tk-wh h2 .tk-ic{color:var(--tc);width:22px;height:22px}
.tk-x{width:42px;height:42px;border-radius:13px;border:1px solid var(--line);background:rgba(255,255,255,.04);display:grid;place-items:center;color:var(--fog)}
.tk-seg{position:relative;display:grid;grid-template-columns:1fr 1fr;margin:8px max(16px,env(safe-area-inset-left,0px)) 0;padding:5px;border-radius:16px;background:var(--pine);border:1px solid var(--line)}
.tk-seg i{position:absolute;top:5px;bottom:5px;left:5px;width:calc(50% - 5px);border-radius:12px;background:var(--tc);transition:transform .55s var(--spring),background .5s;box-shadow:0 8px 24px -8px var(--tc)}
.tk-seg[data-i="1"] i{transform:translateX(100%)}
.tk-seg button{position:relative;z-index:1;border:0;background:none;padding:8px 6px;border-radius:12px;color:var(--mist);text-align:center;transition:color .3s}
.tk-seg button b{display:block;font:700 14.5px var(--display)}
.tk-seg button small{font:500 10.5px var(--mono)}
.tk-seg button.on{color:var(--night)}
.tk-names{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;padding:12px 16px 2px}
.tk-name{border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--mist);border-radius:99px;padding:6px 12px;font:600 13px var(--body);transition:all .3s var(--spring)}
.tk-name em{font-style:normal;font-family:var(--mono);font-size:11px;opacity:.75;margin-left:5px}
.tk-name.on{background:var(--fog);color:var(--night);border-color:transparent;transform:translateY(-2px)}
.tk-track{--cw:min(86vw,360px);display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:16px calc((100% - var(--cw))/2) 8px;scrollbar-width:none;flex:none;perspective:1200px}
.tk-track::-webkit-scrollbar{display:none}
.tk-dots{display:flex;justify-content:center;gap:6px;padding:6px 0 18px}
.tk-dots i{width:7px;height:7px;border-radius:99px;background:var(--line);transition:width .4s var(--spring),background .3s}
.tk-dots i.on{width:22px;background:var(--tc)}

/* the ticket */
.tk-card{--paper:#f3f6f2;--ink:#0d1a16;position:relative;flex:none;width:var(--cw);scroll-snap-align:center;border-radius:22px;background:var(--paper);color:var(--ink);
  box-shadow:0 30px 60px -24px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.06);transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .3s var(--ease);overflow:hidden}
.tk-card::after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.55) 48%,rgba(190,255,225,.25) 52%,transparent 64%);background-size:250% 250%;background-position:var(--sx,120%) 0;mix-blend-mode:soft-light;transition:background-position .25s}
.tk-stub{position:relative;padding:16px 18px 18px;background:linear-gradient(160deg,#10221c,#183a30);color:var(--fog);overflow:hidden}
.tk-stub::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(-45deg,rgba(255,255,255,.025) 0 2px,transparent 2px 9px)}
.tk-sr{position:relative;display:flex;justify-content:space-between;align-items:center;gap:8px}
.tk-op{font:600 10.5px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--mist)}
.tk-rt{position:relative;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;margin-top:14px}
.tk-city small{display:block;font:500 10px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.tk-city b{display:block;font:800 26px/1 var(--display);letter-spacing:-.02em}
.tk-city.r{text-align:right}
.tk-road{position:relative;height:24px}
.tk-road::before{content:"";position:absolute;left:0;right:0;top:50%;border-top:2px dashed rgba(232,239,233,.28)}
.tk-road .tk-ic{position:absolute;top:50%;left:0;width:22px;height:22px;margin-top:-11px;color:var(--tc);background:#14302a;border-radius:6px;padding:2px;animation:tkDrive 3.6s var(--ease) infinite}
@keyframes tkDrive{0%{left:0;opacity:0}12%{opacity:1}80%{opacity:1}100%{left:calc(100% - 22px);opacity:0}}
.tk-tm{position:relative;display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:12px;font:600 13px var(--body);color:var(--fog)}
.tk-mid{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:center;padding:16px 18px 14px}
.tk-bigseat{display:grid;place-items:center;min-width:72px;padding:8px 6px 6px;border-radius:16px;background:var(--tc);color:var(--ink);line-height:1}
.tk-bigseat small{font:700 9.5px var(--mono);letter-spacing:.18em;text-transform:uppercase}
.tk-bigseat b{font:800 40px/1 var(--display);font-variant-numeric:tabular-nums;letter-spacing:-.03em}
.tk-who small{display:block;font:500 10px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:#5c7168}
.tk-who b{display:block;font:700 18px/1.15 var(--display);letter-spacing:-.01em;text-transform:uppercase;overflow-wrap:anywhere}
.tk-perf{position:relative;height:0;border-top:2px dashed #c8d3cd;margin:0 22px}
.tk-perf::before,.tk-perf::after{content:"";position:absolute;top:-13px;width:24px;height:24px;border-radius:50%;background:var(--night)}
.tk-perf::before{left:-35px}.tk-perf::after{right:-35px}
.tk-qrbox{display:grid;justify-items:center;gap:8px;padding:16px 18px 6px}
.tk-qr{position:relative;width:min(58vw,34vh,236px);aspect-ratio:1;border:0;padding:0;border-radius:14px;background:#fff;box-shadow:0 0 0 1px #dfe6e2,0 10px 24px -12px rgba(13,26,22,.35);cursor:zoom-in;transition:transform .3s var(--spring)}
.tk-qr:hover{transform:scale(1.03)}
.tk-qr svg{display:block;width:100%;height:100%}
.tk-hint{display:flex;align-items:center;gap:6px;font:600 12px var(--body);color:#4d6259}
.tk-hint .tk-ic{width:14px;height:14px}
.tk-meta{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:10px 14px;padding:12px 18px 6px}
.tk-meta div small{display:block;font:500 9.5px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:#6b7f76}
.tk-meta div b{display:block;font:600 12.5px var(--mono);word-break:break-all}
.tk-orig{display:flex;align-items:center;justify-content:center;gap:7px;width:calc(100% - 36px);margin:10px 18px 18px;padding:10px;border-radius:12px;border:1px solid #cdd8d2;background:none;color:var(--ink);font:600 13px var(--body)}
.tk-orig:hover{background:#e6ece8}
.tk-orig .tk-ic{width:16px;height:16px}

/* fullscreen QR + receipt */
.tk-full{position:fixed;inset:0;z-index:1001;display:grid;place-content:center;justify-items:center;gap:16px;padding:24px max(16px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:#fff;color:#0d1a16;text-align:center}
.tk-full .tk-fq{position:relative;width:min(88vw,62vh,520px);aspect-ratio:1}
.tk-full .tk-fq svg{width:100%;height:100%;display:block}
.tk-scanl{position:absolute;left:4%;right:4%;height:3px;top:8%;border-radius:3px;background:var(--moss);box-shadow:0 0 18px 4px rgba(134,196,163,.8);opacity:0}
.tk-full h3{margin:0;font:800 clamp(22px,6vw,34px)/1.1 var(--display);text-transform:uppercase;letter-spacing:-.01em}
.tk-full p{margin:0;font:600 15px var(--mono);color:#41544c}
.tk-full .tk-bright{display:inline-flex;align-items:center;gap:6px;font:500 12.5px var(--body);color:#6b7f76}
.tk-fclose{position:absolute;top:calc(14px + env(safe-area-inset-top,0px));right:calc(14px + env(safe-area-inset-right,0px));width:46px;height:46px;border-radius:14px;border:1px solid #d6dfda;background:#fff;color:#0d1a16;display:grid;place-items:center}
.tk-rec{position:fixed;inset:0;z-index:1001;overflow:auto;background:rgba(4,10,8,.92);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:grid;justify-items:center;align-content:start;padding:calc(70px + env(safe-area-inset-top,0px)) 16px calc(30px + env(safe-area-inset-bottom,0px))}
.tk-rec img{width:min(100%,420px);height:auto;border-radius:10px;box-shadow:0 30px 70px rgba(0,0,0,.6);background:#fff}
.tk-rec .tk-fclose{background:var(--pine);color:var(--fog);border-color:var(--line)}
@media (prefers-reduced-motion:reduce){.tk-class,.tk-road .tk-ic,.tk-chip[data-s=now]{animation:none!important}.tk-wallet{transition:none}}
`;
  document.head.insertAdjacentHTML('beforeend', `<style id="tk-css">${css}</style>`);

  const TC = { out: '#86c4a3', ret: '#f6c46a' };

  /* ---------------- section on the page ---------------- */
  function sectionHTML() {
    return `<section class="tk-sec" id="bus-tickets"><div class="wrap">
      <div class="sec-head"><div><p class="eyebrow">Bus tickets</p><h2>Seats on the Victory Liner</h2></div><p class="sub">Tap a name to open that ticket, then tap the QR to show it full screen to the conductor.</p></div>
      <div class="tk-trips">${TRIPS.map(t => {
        const st = status(t);
        return `<article class="tk-trip" style="--tc:${TC[t.id]}">
          <div class="tk-th"><div><div class="tk-route">${t.from}${ic('arrow')}${t.to}</div><p class="tk-when">${fmtDate(t)} · ${fmtTime(t)} · ${t.tickets.length} passengers</p></div>
          <div style="display:grid;gap:6px;justify-items:end"><span class="tk-class">${t.klass}</span><span class="tk-chip" data-s="${st.s}" data-st="${t.id}">${ic('clock')}${st.txt}</span></div></div>
          <ul class="tk-pax">${t.tickets.map(p => `<li><button class="tk-row" data-trip="${t.id}" data-tk="${p.id}"><span class="tk-seat">${p.seat}</span><span><b>${p.name}</b><small>Seat ${p.seat} · ${p.inv}</small></span>${ic('chev')}</button></li>`).join('')}</ul>
          <button class="tk-cta" data-trip="${t.id}">${ic('ticket')}Open ${t.from} → ${t.to} tickets</button>
        </article>`;
      }).join('')}</div></div></section>`;
  }
  const anchor = $('#route') || $('#plan');
  if (anchor) anchor.insertAdjacentHTML('afterend', sectionHTML());
  else document.body.insertAdjacentHTML('beforeend', sectionHTML());

  /* top bar button */
  const sync = $('#sync');
  const topBtn = document.createElement('button');
  topBtn.className = 'tk-top'; topBtn.type = 'button'; topBtn.setAttribute('aria-label', 'Open bus tickets');
  topBtn.innerHTML = `${ic('ticket')}<span>Tickets</span>`;
  if (sync) { const g = document.createElement('div'); g.className = 'tk-topgrp'; sync.replaceWith(g); g.append(topBtn, sync); }
  else document.body.append(topBtn);

  /* ---------------- wallet ---------------- */
  let W = null, cur = null, idx = 0, pushed = false;

  function cardHTML(t, p, i) {
    return `<article class="tk-card" data-id="${p.id}" style="--tc:${TC[t.id]}" aria-label="Ticket ${i + 1} of ${t.tickets.length}: ${p.name}, seat ${p.seat}">
      <div class="tk-stub">
        <div class="tk-sr"><span class="tk-op">Victory Liner · ${i + 1} of ${t.tickets.length}</span><span class="tk-class">${t.klass}</span></div>
        <div class="tk-rt"><div class="tk-city"><small>From</small><b>${t.from}</b></div><div class="tk-road">${ic('bus')}</div><div class="tk-city r"><small>To</small><b>${t.to}</b></div></div>
        <div class="tk-tm"><span>${fmtDate(t)} · ${fmtTime(t)}</span><span class="tk-chip" data-s="${status(t).s}" data-st="${t.id}">${ic('clock')}${status(t).txt}</span></div>
      </div>
      <div class="tk-mid"><div class="tk-bigseat"><small>Seat</small><b>${p.seat}</b></div><div class="tk-who"><small>Passenger</small><b>${p.name}</b></div></div>
      <div class="tk-perf"></div>
      <div class="tk-qrbox"><button class="tk-qr" data-qr="${p.id}" aria-label="Show ${first(p.name)}'s QR code full screen">${QR[p.id]}</button><span class="tk-hint">${ic('scan')}Tap the code to show it full screen</span></div>
      <div class="tk-meta"><div><small>Booking no.</small><b>${t.booking}</b></div><div><small>Fare</small><b>${peso(t.fare)}</b></div><div><small>Invoice no.</small><b>${p.inv}</b></div><div><small>Ticket</small><b>Online</b></div></div>
      <button class="tk-orig" data-orig="${p.id}">${ic('receipt')}View original receipt</button>
    </article>`;
  }

  function build() {
    W = document.createElement('div');
    W.className = 'tk-wallet'; W.setAttribute('role', 'dialog'); W.setAttribute('aria-modal', 'true'); W.setAttribute('aria-label', 'Bus tickets'); W.hidden = true;
    W.innerHTML = `<div class="tk-wh"><h2>${ic('ticket')}Bus tickets</h2><button class="tk-x" aria-label="Close tickets">${ic('x')}</button></div>
      <div class="tk-seg" role="tablist">${TRIPS.map(t => `<button role="tab" data-trip="${t.id}"><b>${t.from} → ${t.to}</b><small>${fmtDate(t)} · ${fmtTime(t)}</small></button>`).join('')}<i></i></div>
      <div class="tk-names"></div><div class="tk-track"></div><div class="tk-dots"></div>`;
    document.body.append(W);
    $('.tk-x', W).onclick = () => close();
    $('.tk-seg', W).onclick = e => { const b = e.target.closest('button'); if (b && b.dataset.trip !== cur) showTrip(b.dataset.trip, null, true); };
    $('.tk-names', W).onclick = e => { const b = e.target.closest('.tk-name'); if (b) goTo(+b.dataset.i); };
    const track = $('.tk-track', W);
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(syncIdx); }, { passive: true });
    track.addEventListener('click', e => {
      const q = e.target.closest('[data-qr]'); if (q) return fullQR(q.dataset.qr, q);
      const o = e.target.closest('[data-orig]'); if (o) return receipt(o.dataset.orig);
      const c = e.target.closest('.tk-card'); if (c) { const i = $$('.tk-card', track).indexOf(c); if (i !== idx) goTo(i); }
    });
    track.addEventListener('pointermove', e => {
      if (RM || e.pointerType !== 'mouse') return;
      const c = e.target.closest('.tk-card'); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--ry', ((x - .5) * 10).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 7).toFixed(2) + 'deg'); c.style.setProperty('--sx', (130 - x * 160).toFixed(0) + '%');
    });
    track.addEventListener('pointerout', e => { const c = e.target.closest('.tk-card'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.style.setProperty('--sx', '120%'); } });
  }

  function showTrip(tripId, ticketId, animate) {
    const t = TRIPS.find(x => x.id === tripId); cur = tripId;
    W.style.setProperty('--tc', TC[tripId]);
    const seg = $('.tk-seg', W), ti = TRIPS.indexOf(t);
    seg.dataset.i = ti; $$('button', seg).forEach((b, i) => { b.classList.toggle('on', i === ti); b.setAttribute('aria-selected', i === ti); });
    $('.tk-names', W).innerHTML = t.tickets.map((p, i) => `<button class="tk-name" data-i="${i}">${first(p.name)}<em>${p.seat}</em></button>`).join('');
    $('.tk-dots', W).innerHTML = t.tickets.map(() => '<i></i>').join('');
    const track = $('.tk-track', W);
    track.innerHTML = t.tickets.map((p, i) => cardHTML(t, p, i)).join('');
    const want = ticketId || store.get()[tripId];
    idx = Math.max(0, t.tickets.findIndex(p => p.id === want));
    requestAnimationFrame(() => { goTo(idx, true); });
    if (animate && !RM) $$('.tk-card', track).forEach((c, i) => c.animate([
      { opacity: 0, transform: 'translateY(70px) rotateX(-28deg) scale(.92)' },
      { opacity: 1, transform: 'none' },
    ], { duration: 800, delay: 120 + Math.abs(i - idx) * 90, easing: 'cubic-bezier(.2,.9,.25,1.15)', fill: 'backwards' }));
    syncIdx();
  }

  function goTo(i, instant) {
    const track = $('.tk-track', W), c = $$('.tk-card', track)[i]; if (!c) return;
    track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: instant || RM ? 'auto' : 'smooth' });
    idx = i; mark();
  }
  function syncIdx() {
    const track = $('.tk-track', W), cards = $$('.tk-card', track); if (!cards.length) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bd = Infinity;
    cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
    if (best !== idx) { idx = best; }
    mark();
  }
  function mark() {
    $$('.tk-name', W).forEach((b, i) => b.classList.toggle('on', i === idx));
    $$('.tk-dots i', W).forEach((d, i) => d.classList.toggle('on', i === idx));
    const t = TRIPS.find(x => x.id === cur), p = t?.tickets[idx];
    if (p) store.set(cur, p.id);
  }

  function open(tripId, ticketId, from) {
    if (!W) build();
    if (from) { const r = from.getBoundingClientRect(); W.style.setProperty('--ox', r.left + r.width / 2 + 'px'); W.style.setProperty('--oy', r.top + r.height / 2 + 'px'); }
    W.hidden = false; document.documentElement.style.overflow = 'hidden';
    showTrip(tripId || defaultTrip(), ticketId, true);
    requestAnimationFrame(() => requestAnimationFrame(() => W.classList.add('open')));
    if (location.hash !== '#tickets') { try { history.pushState({ tk: 1 }, '', '#tickets'); pushed = true; } catch {} }
    setTimeout(() => $('.tk-x', W)?.focus({ preventScroll: true }), 300);
  }
  function close(fromPop) {
    if (!W || W.hidden) return;
    W.classList.remove('open');
    setTimeout(() => { W.hidden = true; document.documentElement.style.overflow = ''; }, RM ? 0 : 650);
    if (!fromPop) {
      if (pushed) { pushed = false; history.back(); }
      else if (location.hash === '#tickets') { try { history.replaceState(null, '', location.pathname + location.search); } catch {} }
    }
  }
  addEventListener('popstate', () => { if (location.hash !== '#tickets') { pushed = false; close(true); closeOverlays(); } else if (!W || W.hidden) open(); });

  /* fullscreen QR */
  let wake = null, overlay = null;
  async function fullQR(id, srcEl) {
    const t = TRIPS.find(x => x.tickets.some(p => p.id === id)), p = t.tickets.find(x => x.id === id);
    overlay = document.createElement('div');
    overlay.className = 'tk-full'; overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-label', `${p.name} QR code`);
    overlay.innerHTML = `<button class="tk-fclose" aria-label="Close">${ic('x')}</button><div class="tk-fq">${QR[id]}<span class="tk-scanl"></span></div>
      <h3>${p.name}</h3><p>Seat ${p.seat} · ${t.from} → ${t.to} · ${fmtDate(t)} ${fmtTime(t)}</p><span class="tk-bright">${ic('sun')}Turn your screen brightness up for the scanner</span>`;
    document.body.append(overlay);
    overlay.onclick = e => { if (e.target.closest('.tk-fclose') || e.target === overlay) closeOverlays(); };
    try { wake = await navigator.wakeLock?.request('screen'); } catch {}
    if (RM) return;
    const fq = $('.tk-fq', overlay), a = srcEl.getBoundingClientRect(), b = fq.getBoundingClientRect();
    overlay.animate([{ background: 'rgba(255,255,255,0)' }, { background: '#fff' }], { duration: 350, easing: 'ease-out' });
    fq.animate([
      { transform: `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${a.width / b.width})` },
      { transform: 'none' },
    ], { duration: 650, easing: 'cubic-bezier(.2,.9,.25,1.12)' });
    $$('h3, p, .tk-bright', overlay).forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 300 + i * 80, easing: 'ease-out', fill: 'backwards' }));
    $('.tk-scanl', overlay).animate([{ top: '6%', opacity: 0 }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .85 }, { top: '93%', opacity: 0 }], { duration: 1100, delay: 520, easing: 'ease-in-out' });
  }
  function receipt(id) {
    overlay = document.createElement('div');
    overlay.className = 'tk-rec'; overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-label', 'Original receipt');
    overlay.innerHTML = `<button class="tk-fclose" aria-label="Close">${ic('x')}</button><img src="tickets/${id}.jpg" alt="Original Victory Liner receipt" width="330" height="954">`;
    document.body.append(overlay);
    overlay.onclick = e => { if (e.target.closest('.tk-fclose') || e.target === overlay) closeOverlays(); };
    if (!RM) $('img', overlay).animate([{ opacity: 0, transform: 'translateY(40px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.2,.9,.25,1.1)' });
  }
  function closeOverlays() {
    if (wake) { wake.release?.().catch(() => {}); wake = null; }
    if (!overlay) return;
    const o = overlay; overlay = null;
    if (RM) return o.remove();
    o.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-in', fill: 'forwards' }).onfinish = () => o.remove();
  }
  addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (overlay) closeOverlays(); else close(); }
    if (W && !W.hidden && !overlay && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) goTo(Math.max(0, Math.min($$('.tk-card', W).length - 1, idx + (e.key === 'ArrowRight' ? 1 : -1))));
  });
  document.addEventListener('visibilitychange', async () => { if (overlay && document.visibilityState === 'visible' && !wake) { try { wake = await navigator.wakeLock?.request('screen'); } catch {} } });

  /* wiring */
  topBtn.onclick = () => open(null, null, topBtn);
  $('#bus-tickets')?.addEventListener('click', e => {
    const b = e.target.closest('[data-trip]'); if (b) open(b.dataset.trip, b.dataset.tk || null, b);
  });
  setInterval(() => $$('[data-st]').forEach(el => { const s = status(TRIPS.find(t => t.id === el.dataset.st)); el.dataset.s = s.s; el.lastChild.textContent = s.txt; }), 30000);
  if (location.hash === '#tickets') setTimeout(() => open(), 50);
})();
