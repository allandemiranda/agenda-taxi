'use strict';

const LogLevel = require('loglevel');
const { NodeTracerProvider } = require('@opentelemetry/node');
const {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} = require('@opentelemetry/tracing');

const provider = new NodeTracerProvider({
  logLevel: LogLevel.TRACE,
});

provider.register();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

console.log('tracing initialized');
