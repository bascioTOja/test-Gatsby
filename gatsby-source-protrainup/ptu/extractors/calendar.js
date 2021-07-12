"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessCalendar = (events) => events.map((event) => (Object.assign(Object.assign({}, event), { id: event.oid.toString() })));
exports.default = ProcessCalendar;
