var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var as = Object.create;
var F = Object.defineProperty;
var ps = Object.getOwnPropertyDescriptor;
var os = Object.getOwnPropertyNames;
var is = Object.getPrototypeOf;
var cs = Object.prototype.hasOwnProperty;
var B = /* @__PURE__ */ __name((s, t) => () => (s && (t = s(s = 0)), t), "B");
var I = /* @__PURE__ */ __name((s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports), "I");
var ns = /* @__PURE__ */ __name((s, t, a, e) => {
  if (t && typeof t == "object" || typeof t == "function") for (let o of os(t)) !cs.call(s, o) && o !== a && F(s, o, { get: /* @__PURE__ */ __name(() => t[o], "get"), enumerable: !(e = ps(t, o)) || e.enumerable });
  return s;
}, "ns");
var H = /* @__PURE__ */ __name((s, t, a) => (a = s != null ? as(is(s)) : {}, ns(t || !s || !s.__esModule ? F(a, "default", { value: s, enumerable: true }) : a, s)), "H");
var x;
var l = B(() => {
  x = { collectedLocales: [] };
});
var y;
var r = B(() => {
  y = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/work/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/work/[slug].rsc?nxtPslug=$nxtPslug" }, { src: "^/work/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/work/[slug]?nxtPslug=$nxtPslug" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|QsHD19mG7p0eLgUMFANaL)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { version: "15.2.0" }, crons: [] };
});
var j;
var u = B(() => {
  j = { "/.DS_Store": { type: "static" }, "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/QsHD19mG7p0eLgUMFANaL/_buildManifest.js": { type: "static" }, "/_next/static/QsHD19mG7p0eLgUMFANaL/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/332.0f824c8ca88d8b96.js": { type: "static" }, "/_next/static/chunks/361.3bbf59d60807736b.js": { type: "static" }, "/_next/static/chunks/369-5186aeeaa9f25421.js": { type: "static" }, "/_next/static/chunks/44530001-9835d9a1d1cc7a22.js": { type: "static" }, "/_next/static/chunks/4bd1b696-ba3f71e1b6602eb1.js": { type: "static" }, "/_next/static/chunks/587-6b7304c61fc7c8c2.js": { type: "static" }, "/_next/static/chunks/64.bb017db73f66a041.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-4be97f15e3a0b5cc.js": { type: "static" }, "/_next/static/chunks/app/about/page-5b7b494d59706956.js": { type: "static" }, "/_next/static/chunks/app/admin/categories/page-6fc831bc53892fca.js": { type: "static" }, "/_next/static/chunks/app/admin/dashboard/page-47bf66b903fbc02a.js": { type: "static" }, "/_next/static/chunks/app/admin/layout-8dcf9b0bea9657c6.js": { type: "static" }, "/_next/static/chunks/app/admin/page-d7e55c6b51ccda07.js": { type: "static" }, "/_next/static/chunks/app/admin/pages/page-c83a35f77e2bc11e.js": { type: "static" }, "/_next/static/chunks/app/admin/profile/page-4317c5af47273b21.js": { type: "static" }, "/_next/static/chunks/app/admin/projects/edit/page-4b10ee02088f22e8.js": { type: "static" }, "/_next/static/chunks/app/admin/projects/new/page-7da3b63455481b38.js": { type: "static" }, "/_next/static/chunks/app/admin/projects/page-3ba6b6c87b316bcf.js": { type: "static" }, "/_next/static/chunks/app/layout-00fb2876f91a07fa.js": { type: "static" }, "/_next/static/chunks/app/page-e8c194d9a45bc57e.js": { type: "static" }, "/_next/static/chunks/app/work/[slug]/page-c3547cdc8b9c2511.js": { type: "static" }, "/_next/static/chunks/app/work/page-fd73d6c252d91a55.js": { type: "static" }, "/_next/static/chunks/framework-859199dea06580b0.js": { type: "static" }, "/_next/static/chunks/main-8689422cdf9d8d0b.js": { type: "static" }, "/_next/static/chunks/main-app-5486d0dd89e8fe42.js": { type: "static" }, "/_next/static/chunks/pages/_app-eef484fc49b57a90.js": { type: "static" }, "/_next/static/chunks/pages/_error-5933f280f2bada68.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-dedc51591760683b.js": { type: "static" }, "/_next/static/css/168dfbe48ab63f7b.css": { type: "static" }, "/_next/static/css/7bbf4245e4a656c4.css": { type: "static" }, "/_next/static/css/84da246615f00b79.css": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/assets/.DS_Store": { type: "static" }, "/assets/css/main.css": { type: "static" }, "/assets/docs/CV.pdf": { type: "static" }, "/assets/images/favico.svg": { type: "static" }, "/assets/images/logo.svg": { type: "static" }, "/assets/images/portfolio-header-bg.webp": { type: "static" }, "/assets/js/main.js": { type: "static" }, "/assets/uploads/2023/07/AJS-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/AJS-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/AJS-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/AJS-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/AJS.jpg": { type: "static" }, "/assets/uploads/2023/07/AJS.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ALMHER-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/ALMHER-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ALMHER-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/ALMHER-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/ALMHER.jpg": { type: "static" }, "/assets/uploads/2023/07/ALMHER.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Alenny-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Alenny-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Alenny-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Alenny-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Alenny.jpg": { type: "static" }, "/assets/uploads/2023/07/Alenny.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Aramis-Camilo-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Aramis-Camilo-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Aramis-Camilo-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Aramis-Camilo-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Aramis-Camilo.jpg": { type: "static" }, "/assets/uploads/2023/07/Aramis-Camilo.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-1024x709.jpg": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-1024x709.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-1536x1064.jpg": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-1536x1064.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-300x208.jpg": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-300x208.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-768x532.jpg": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising-768x532.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising.jpg": { type: "static" }, "/assets/uploads/2023/07/Bus-Advertising.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/CS-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/CS-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/CS-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/CS-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/CS.jpg": { type: "static" }, "/assets/uploads/2023/07/CS.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Casa-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/Casa-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Casa-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/Casa-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/Casa.jpg": { type: "static" }, "/assets/uploads/2023/07/Casa.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Casanova-fans-1024x673.jpg": { type: "static" }, "/assets/uploads/2023/07/Casanova-fans-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Casanova-fans-300x197.jpg": { type: "static" }, "/assets/uploads/2023/07/Casanova-fans-768x505.jpg": { type: "static" }, "/assets/uploads/2023/07/Casanova-fans.jpg": { type: "static" }, "/assets/uploads/2023/07/Casanova-fans.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Cepeda-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Cepeda-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Cepeda-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Cepeda-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Cepeda.jpg": { type: "static" }, "/assets/uploads/2023/07/Cepeda.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/DH-Services-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/DH-Services-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/DH-Services-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/DH-Services-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/DH-Services.jpg": { type: "static" }, "/assets/uploads/2023/07/DH-Services.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Degan-Business-C-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/Degan-Business-C-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Degan-Business-C-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/Degan-Business-C-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/Degan-Business-C.jpg": { type: "static" }, "/assets/uploads/2023/07/Degan-Business-C.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-1-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-1-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-1.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-2-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-2-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-2.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-2.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-3-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-3-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-3-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-3.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-3.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-4-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-4-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-4-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-4.jpg": { type: "static" }, "/assets/uploads/2023/07/Dine-In-Menu-4.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Divas-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Divas-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Divas-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Divas-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Divas.jpg": { type: "static" }, "/assets/uploads/2023/07/Divas.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Dominican-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/Dominican-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Dominican-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/Dominican-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/Dominican.jpg": { type: "static" }, "/assets/uploads/2023/07/Dominican.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/El-Zafiro-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/El-Zafiro-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/El-Zafiro-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/El-Zafiro-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/El-Zafiro.jpg": { type: "static" }, "/assets/uploads/2023/07/El-Zafiro.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Era-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/Era-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Era-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/Era-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/Era.jpg": { type: "static" }, "/assets/uploads/2023/07/Era.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Feather-Flag-1024x756.jpg": { type: "static" }, "/assets/uploads/2023/07/Feather-Flag-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Feather-Flag-300x222.jpg": { type: "static" }, "/assets/uploads/2023/07/Feather-Flag-768x567.jpg": { type: "static" }, "/assets/uploads/2023/07/Feather-Flag.jpg": { type: "static" }, "/assets/uploads/2023/07/Feather-Flag.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Frank-Reyes-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Frank-Reyes-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Frank-Reyes-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Frank-Reyes-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Frank-Reyes.jpg": { type: "static" }, "/assets/uploads/2023/07/Frank-Reyes.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/FullSizeRender-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/FullSizeRender-300x300.jpg": { type: "static" }, "/assets/uploads/2023/07/FullSizeRender.jpg": { type: "static" }, "/assets/uploads/2023/07/JC-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/JC-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/JC-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/JC-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/JC.jpg": { type: "static" }, "/assets/uploads/2023/07/JC.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Karaoke-Night-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Karaoke-Night-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Karaoke-Night-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Karaoke-Night-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Karaoke-Night.jpg": { type: "static" }, "/assets/uploads/2023/07/Karaoke-Night.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Ladies-Night-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Ladies-Night-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Ladies-Night-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Ladies-Night-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Ladies-Night.jpg": { type: "static" }, "/assets/uploads/2023/07/Ladies-Night.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-1-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-1-628x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-1.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-2-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-2-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-2.jpg": { type: "static" }, "/assets/uploads/2023/07/Liquor-Menu-2.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-1-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-1-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-1.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-2-184x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-2-629x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-2.jpg": { type: "static" }, "/assets/uploads/2023/07/Lunch-Special-2.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Pdegan-poster-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/07/Pdegan-poster-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Pdegan-poster-300x200.jpg": { type: "static" }, "/assets/uploads/2023/07/Pdegan-poster-768x512.jpg": { type: "static" }, "/assets/uploads/2023/07/Pdegan-poster.jpg": { type: "static" }, "/assets/uploads/2023/07/Pdegan-poster.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Poeters-1024x644.jpg": { type: "static" }, "/assets/uploads/2023/07/Poeters-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Poeters-300x189.jpg": { type: "static" }, "/assets/uploads/2023/07/Poeters-768x483.jpg": { type: "static" }, "/assets/uploads/2023/07/Poeters.jpg": { type: "static" }, "/assets/uploads/2023/07/Poeters.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1-1024x724.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1-1536x1087.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1-300x212.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1-768x543.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2-1024x724.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2-1536x1087.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2-300x212.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2-768x543.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2.jpg": { type: "static" }, "/assets/uploads/2023/07/RC-Invitate-7x10-2.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Raul-Morel-1024x578.jpg": { type: "static" }, "/assets/uploads/2023/07/Raul-Morel-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Raul-Morel-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Raul-Morel-768x433.jpg": { type: "static" }, "/assets/uploads/2023/07/Raul-Morel.jpg": { type: "static" }, "/assets/uploads/2023/07/Raul-Morel.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Back-Flyer-1024x696.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Back-Flyer-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Back-Flyer-300x204.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Back-Flyer-768x522.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Back-Flyer.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Back-Flyer.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Front-Flyer-1024x696.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Front-Flyer-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Front-Flyer-300x204.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Front-Flyer-768x522.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Front-Flyer.jpg": { type: "static" }, "/assets/uploads/2023/07/Restaurant-Front-Flyer.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-1-233x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-1-233x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-1.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-10-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-10-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-10-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-10-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-10.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-10.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-11-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-11-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-11-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-11-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-11.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-11.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-12-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-12-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-12-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-12-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-12.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-12.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-13-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-13-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-13-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-13-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-13.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-13.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-14-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-14-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-14-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-14-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-14.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-14.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-15-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-15-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-15-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-15-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-15.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-15.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-16-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-16-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-16-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-16-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-16.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-16.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-17-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-17-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-17-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-17-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-17.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-17.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-18-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-18-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-18-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-18-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-18.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-18.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-19-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-19-233x300.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-19.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-19.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-2-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-2-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-2-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-2.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-2.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-3-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-3-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-3-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-3-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-3.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-3.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-4-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-4-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-4-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-4-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-4.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-4.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-5-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-5-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-5-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-5-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-5.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-5.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-6-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-6-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-6-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-6-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-6.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-6.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-7-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-7-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-7-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-7-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-7.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-7.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-8-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-8-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-8-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-8-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-8.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-8.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-9-1024x668.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-9-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-9-300x196.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-9-768x501.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-9.jpg": { type: "static" }, "/assets/uploads/2023/07/Roberto-Clemente-Booklet-9.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Sabados-Gozadera-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Sabados-Gozadera-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Sabados-Gozadera-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Sabados-Gozadera-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Sabados-Gozadera.jpg": { type: "static" }, "/assets/uploads/2023/07/Sabados-Gozadera.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-1024x776.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-1024x776.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-300x227.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-300x227.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-768x582.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1-768x582.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-1.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-2-1024x776.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-2-300x227.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-2-768x582.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-2.jpg": { type: "static" }, "/assets/uploads/2023/07/Sponsorship-RSVP-Card-8x6-2.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/Todos-los-Sabados-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/Todos-los-Sabados-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/Todos-los-Sabados-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/Todos-los-Sabados-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/Todos-los-Sabados.jpg": { type: "static" }, "/assets/uploads/2023/07/Todos-los-Sabados.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/X-Stand-Banner-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/X-Stand-Banner-214x300.jpg": { type: "static" }, "/assets/uploads/2023/07/X-Stand-Banner-731x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/X-Stand-Banner-768x1075.jpg": { type: "static" }, "/assets/uploads/2023/07/X-Stand-Banner.jpg": { type: "static" }, "/assets/uploads/2023/07/X-Stand-Banner.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-227x300.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-227x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-768x1014.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-768x1014.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-776x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-776x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-about-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-about-300x262.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-about-768x670.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-about.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-about.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-contact-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-contact-282x300.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-contact-768x817.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-contact-963x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-contact.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-contact.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-get-a-quote-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-get-a-quote-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-get-a-quote-768x433.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-get-a-quote.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-get-a-quote.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services-151x300.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services-517x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services-768x1521.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services-776x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net-services.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net.jpg": { type: "static" }, "/assets/uploads/2023/07/ajsmechanical-net.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/almonte-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/almonte-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/almonte-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/almonte-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/almonte.jpg": { type: "static" }, "/assets/uploads/2023/07/almonte.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1-1024x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1-1536x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1-2048x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1-300x300.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1-768x768.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1.jpg": { type: "static" }, "/assets/uploads/2023/07/banner-scaled-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/charlie-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/charlie-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/charlie-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/charlie-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/charlie.jpg": { type: "static" }, "/assets/uploads/2023/07/charlie.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/chevron.svg": { type: "static" }, "/assets/uploads/2023/07/city-about.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/city-contact.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/city-gallery.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/city-home-300x187.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/city-home-768x479.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/city-home.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/city-services.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/combos-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/combos-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/combos-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/combos-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/combos.jpg": { type: "static" }, "/assets/uploads/2023/07/combos.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/cozuna-contact-150x150.jpeg": { type: "static" }, "/assets/uploads/2023/07/cozuna-contact-300x172.jpeg": { type: "static" }, "/assets/uploads/2023/07/cozuna-contact-768x440.jpeg": { type: "static" }, "/assets/uploads/2023/07/cozuna-contact.jpeg": { type: "static" }, "/assets/uploads/2023/07/cozuna-contact.jpeg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-about.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-contact.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-home-115x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-home-392x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-home-588x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-home-768x2005.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-home-785x2048.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/creparis-home.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards-1536x1152.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-business-cards.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degan-logo-1024x682.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-logo-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-logo-1536x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-logo-300x200.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-logo-768x512.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-logo.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-logo.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degan-mask-1024x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-mask-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-mask-300x300.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-mask-768x768.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-mask.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-posters-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-posters-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-posters-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-posters-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-posters.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-posters.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degan-web-design-1024x667.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-web-design-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-web-design-300x195.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-web-design-768x500.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-web-design.jpg": { type: "static" }, "/assets/uploads/2023/07/degan-web-design.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-about-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-about-us-273x300.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-about-us-768x842.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-about-us-934x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-about-us.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-about-us.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-contact-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-contact-us-253x300.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-contact-us-768x912.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-contact-us-863x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-contact-us.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-contact-us.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-114x300.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-114x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-390x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-390x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-584x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-584x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-768x2019.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-768x2019.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-779x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1-779x2048.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-scaled-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/degantax-services-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-services-225x300.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-services-768x1022.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-services-769x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-services.jpg": { type: "static" }, "/assets/uploads/2023/07/degantax-services.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/demsoco-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/demsoco-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/demsoco-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/demsoco-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/demsoco.jpg": { type: "static" }, "/assets/uploads/2023/07/demsoco.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/essence-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/essence-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/essence-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/essence-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/essence.jpg": { type: "static" }, "/assets/uploads/2023/07/essence.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/fina-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/fina-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/fina-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/fina-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/fina.jpg": { type: "static" }, "/assets/uploads/2023/07/fina.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/flyers-1024x736.jpg": { type: "static" }, "/assets/uploads/2023/07/flyers-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/flyers-300x216.jpg": { type: "static" }, "/assets/uploads/2023/07/flyers-768x552.jpg": { type: "static" }, "/assets/uploads/2023/07/flyers.jpg": { type: "static" }, "/assets/uploads/2023/07/flyers.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/gaucho-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/gaucho-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/gaucho-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/gaucho-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/gaucho.jpg": { type: "static" }, "/assets/uploads/2023/07/gaucho.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/grisel-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/grisel-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/grisel-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/grisel-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/grisel.jpg": { type: "static" }, "/assets/uploads/2023/07/grisel.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/henrry-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/henrry-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/henrry-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/henrry-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/henrry.jpg": { type: "static" }, "/assets/uploads/2023/07/henrry.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/hotel-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/hotel-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/hotel-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/hotel-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/hotel.jpg": { type: "static" }, "/assets/uploads/2023/07/hotel.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/i-Love-bachata-2018-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/i-Love-bachata-2018-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/i-Love-bachata-2018-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/i-Love-bachata-2018-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/i-Love-bachata-2018.jpg": { type: "static" }, "/assets/uploads/2023/07/i-Love-bachata-2018.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/jacinta-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinta-1024x739.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinta-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinta-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinta-300x217.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinta-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinta-768x554.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinta.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinta.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-117x300.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-117x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-399x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-399x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-599x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-599x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-768x1970.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-768x1970.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-799x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-799x2048.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-catalogue-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-catalogue-191x300.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-catalogue-652x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-catalogue-768x1206.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-catalogue.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-catalogue.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-contactez-nous-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-contactez-nous-190x300.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-contactez-nous-649x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-contactez-nous-768x1212.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-contactez-nous.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-contactez-nous.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous-190x300.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous-647x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous-768x1215.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous-971x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-nous.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1-110x300.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1-374x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1-562x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1-749x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1-768x2101.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio-services-scaled-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio.jpg": { type: "static" }, "/assets/uploads/2023/07/jacinthecoiffurestudio.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/jelisssa-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/jelisssa-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/jelisssa-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/jelisssa-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/jelisssa.jpg": { type: "static" }, "/assets/uploads/2023/07/jelisssa.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/justice-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/justice-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/justice-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/justice-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/justice.jpg": { type: "static" }, "/assets/uploads/2023/07/justice.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/la-doncella-del-acordion-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/la-doncella-del-acordion-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/la-doncella-del-acordion-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/la-doncella-del-acordion-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/la-doncella-del-acordion.jpg": { type: "static" }, "/assets/uploads/2023/07/la-doncella-del-acordion.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/lainez-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/lainez-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/lainez-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/lainez-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/lainez.jpg": { type: "static" }, "/assets/uploads/2023/07/lainez.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/lisbeth-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/lisbeth-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/lisbeth-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/lisbeth-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/lisbeth.jpg": { type: "static" }, "/assets/uploads/2023/07/lisbeth.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/menu-cover-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/menu-cover-1024x768.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/menu-cover-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/menu-cover-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/menu-cover-300x225.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/menu-cover-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/menu-cover-768x576.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/menu-cover.jpg": { type: "static" }, "/assets/uploads/2023/07/menu-cover.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/mgw-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/mgw-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/mgw-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/mgw-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/mgw.jpg": { type: "static" }, "/assets/uploads/2023/07/mgw.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/mkhail-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/mkhail-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/mkhail-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/mkhail-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/mkhail.jpg": { type: "static" }, "/assets/uploads/2023/07/mkhail.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/next-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/next-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/next-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/next-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/next.jpg": { type: "static" }, "/assets/uploads/2023/07/next.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasis-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/oasis-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/oasis-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/oasis-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/oasis.jpg": { type: "static" }, "/assets/uploads/2023/07/oasis.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-120x300.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-408x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-612x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-768x1928.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-816x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-196x300.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-196x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-668x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-668x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-768x1177.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous-768x1177.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-a-propos-de-nous.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement-155x300.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement-530x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement-768x1483.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement-795x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-emplacement.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1-239x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1-358x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1-478x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1-70x300.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique-services-scaled-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique.jpg": { type: "static" }, "/assets/uploads/2023/07/oasisesthetique.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-about-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-about-206x300.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-about-702x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-about-768x1120.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-about.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-about.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact-152x300.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact-519x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact-768x1516.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact-778x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-contact.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-109x300.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-109x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-373x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-373x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-560x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-560x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-746x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-746x2048.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-768x2107.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-768x2107.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-scaled.jpg": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home-scaled.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/overallhvacnj-home.jpg": { type: "static" }, "/assets/uploads/2023/07/pakole-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pakole-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pakole-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/pakole-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/pakole.jpg": { type: "static" }, "/assets/uploads/2023/07/pakole.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pakolev2-1024x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pakolev2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pakolev2-300x169.jpg": { type: "static" }, "/assets/uploads/2023/07/pakolev2-768x432.jpg": { type: "static" }, "/assets/uploads/2023/07/pakolev2.jpg": { type: "static" }, "/assets/uploads/2023/07/pakolev2.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-1-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-1-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-1-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-1.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-1.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-10-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-10-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-10-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-10-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-10.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-10.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-2-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-2-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-2-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-2.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-2.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-3-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-3-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-3-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-3-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-3.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-3.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-4-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-4-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-4-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-4-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-4.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-4.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-5-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-5-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-5-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-5-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-5.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-5.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-6-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-6-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-6-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-6-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-6.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-6.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-7-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-7-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-7-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-7-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-7.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-7.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-8-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-8-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-8-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-8-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-8.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-8.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-1024x768.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-1024x768.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-300x225.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-300x225.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-768x576.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9-768x576.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9.jpg": { type: "static" }, "/assets/uploads/2023/07/pennzoil-9.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/posters-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/07/posters-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/posters-300x200.jpg": { type: "static" }, "/assets/uploads/2023/07/posters-768x512.jpg": { type: "static" }, "/assets/uploads/2023/07/posters.jpg": { type: "static" }, "/assets/uploads/2023/07/posters.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/reedom-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/reedom-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/reedom-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/reedom-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/reedom.jpg": { type: "static" }, "/assets/uploads/2023/07/reedom.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refried-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/refried-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refried-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/refried-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/refried.jpg": { type: "static" }, "/assets/uploads/2023/07/refried.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-104x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-104x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-356x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-356x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-534x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-534x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-about-us-147x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-about-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-about-us-502x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-about-us.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-about-us.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-chefs-specialties-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-chefs-specialties-155x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-chefs-specialties-529x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-chefs-specialties.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-chefs-specialties.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-contact-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-contact-us-168x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-contact-us-573x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-contact-us.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-contact-us.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1-258x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1-386x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1-515x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1-75x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-drinks-scaled-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1-236x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1-354x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1-472x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1-69x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-our-menu-scaled-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-salads-soups-144x300.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-salads-soups-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-salads-soups-493x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-salads-soups.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc-salads-soups.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc.jpg": { type: "static" }, "/assets/uploads/2023/07/refriedbeansnyc.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/reseind-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/reseind-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/reseind-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/reseind-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/reseind.jpg": { type: "static" }, "/assets/uploads/2023/07/reseind.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rollup-banners-1024x673.jpg": { type: "static" }, "/assets/uploads/2023/07/rollup-banners-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/rollup-banners-300x197.jpg": { type: "static" }, "/assets/uploads/2023/07/rollup-banners-768x505.jpg": { type: "static" }, "/assets/uploads/2023/07/rollup-banners.jpg": { type: "static" }, "/assets/uploads/2023/07/rollup-banners.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/rosado-contact.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-home-141x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-home-480x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-home-721x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-home-768x1637.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-home-961x2048.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-home.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-servicio.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/rosado-sobre-mi.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/ruth-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/ruth-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/ruth-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/ruth-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/ruth.jpg": { type: "static" }, "/assets/uploads/2023/07/ruth.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-febrero-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-febrero-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-febrero-300x200.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-febrero-768x512.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-febrero.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-febrero.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-marzo-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-marzo-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-marzo-300x200.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-marzo-768x512.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-marzo.jpg": { type: "static" }, "/assets/uploads/2023/07/sabado-25-de-marzo.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/07/smoking-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/smoking-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/smoking-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/smoking-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/smoking.jpg": { type: "static" }, "/assets/uploads/2023/07/smoking.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/target-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/target-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/target-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/target-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/target.jpg": { type: "static" }, "/assets/uploads/2023/07/target.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-178x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-607x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-768x1296.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-911x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-about-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-about-us-175x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-about-us-598x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-about-us-768x1315.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-about-us-897x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-about-us.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-contact-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-contact-us-182x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-contact-us-623x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-contact-us-768x1263.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-contact-us-934x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-contact-us.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links-136x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links-464x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links-696x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links-768x1694.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links-929x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-links.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-services-145x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-services-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-services-496x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-services-744x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-services-768x1585.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net-services.jpg": { type: "static" }, "/assets/uploads/2023/07/tbstax-net.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-126x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-126x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-429x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-429x1024.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-643x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-643x1536.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-768x1834.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-768x1834.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-858x2048.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-858x2048.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-about-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-about-us-242x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-about-us-768x954.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-about-us-824x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-about-us.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-about-us.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-contact-us-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-contact-us-223x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-contact-us-762x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-contact-us-768x1033.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-contact-us.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-contact-us.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices-168x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices-575x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices-768x1367.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices-863x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-prices.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources-153x300.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources-521x1024.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources-768x1509.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources-782x1536.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-resources.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-services-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-services-300x228.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-services-768x583.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-services.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga-services.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga.jpg": { type: "static" }, "/assets/uploads/2023/07/tuvozamiga.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/voz-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/voz-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/voz-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/voz-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/voz.jpg": { type: "static" }, "/assets/uploads/2023/07/voz.jpg.webp": { type: "static" }, "/assets/uploads/2023/07/william-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/07/william-150x150.jpg": { type: "static" }, "/assets/uploads/2023/07/william-300x217.jpg": { type: "static" }, "/assets/uploads/2023/07/william-768x554.jpg": { type: "static" }, "/assets/uploads/2023/07/william.jpg": { type: "static" }, "/assets/uploads/2023/07/william.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/21022459-1024x707.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459-1536x1060.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459-2048x1414.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459-300x207.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459-768x530.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459.jpg": { type: "static" }, "/assets/uploads/2023/08/21022459.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/5-hour-Poster-1024x788.jpg": { type: "static" }, "/assets/uploads/2023/08/5-hour-Poster-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/5-hour-Poster-300x231.jpg": { type: "static" }, "/assets/uploads/2023/08/5-hour-Poster-768x591.jpg": { type: "static" }, "/assets/uploads/2023/08/5-hour-Poster.jpg": { type: "static" }, "/assets/uploads/2023/08/5-hour-Poster.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-1-182x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-1.jpg": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-1.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-2-182x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-2.jpg": { type: "static" }, "/assets/uploads/2023/08/Brisa-del-Mar-8.5-x-14-2.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer-5.5x8.5v2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer-5.5x8.5v2-197x300.jpg": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer-5.5x8.5v2.jpg": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer-5.5x8.5v2.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer5x7v2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer5x7v2-227x300.jpg": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer5x7v2.jpg": { type: "static" }, "/assets/uploads/2023/08/CHERLY-WILLS-NY1-Flyer5x7v2.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/COzuna-favico.svg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-1-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-1-300x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-1.jpg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-1.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-2-300x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-2.jpg": { type: "static" }, "/assets/uploads/2023/08/Cafe-D-Alsace-BC-2.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Carl-Dunn-Flyer-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Carl-Dunn-Flyer-300x204.jpg": { type: "static" }, "/assets/uploads/2023/08/Carl-Dunn-Flyer-768x522.jpg": { type: "static" }, "/assets/uploads/2023/08/Carl-Dunn-Flyer.jpg": { type: "static" }, "/assets/uploads/2023/08/Carl-Dunn-Flyer.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life-150x150.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life-300x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life-300x300.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life-768x768.jpg": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life-768x768.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life.jpg": { type: "static" }, "/assets/uploads/2023/08/Celebrating-Life.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division.jpg": { type: "static" }, "/assets/uploads/2023/08/Detective-2nd-Grade-Elizabeth-Lugo-shield-7687-From-your-friends-at-Special-Victims-Division.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_B_July_30-1024x741.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_B_July_30-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_B_July_30-300x217.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_B_July_30-768x556.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_B_July_30.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_B_July_30.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_F_July_30-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_F_July_30-217x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_F_July_30.jpg": { type: "static" }, "/assets/uploads/2023/08/Don-Coqui-5x7_F_July_30.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Flyer_We_Got_It-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyer_We_Got_It-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyer_We_Got_It-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyer_We_Got_It-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyer_We_Got_It.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyers-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyers-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyers-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyers-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyers.jpg": { type: "static" }, "/assets/uploads/2023/08/Flyers.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Nipsey-Front-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Nipsey-Front-214x300.jpg": { type: "static" }, "/assets/uploads/2023/08/Nipsey-Front.jpg": { type: "static" }, "/assets/uploads/2023/08/Nipsey-Front.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Poster-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/Poster-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Poster-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/Poster-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/Poster.jpg": { type: "static" }, "/assets/uploads/2023/08/Poster.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/QUEENSBRIDGE-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/QUEENSBRIDGE-300x217.jpg": { type: "static" }, "/assets/uploads/2023/08/QUEENSBRIDGE-768x556.jpg": { type: "static" }, "/assets/uploads/2023/08/QUEENSBRIDGE.jpg": { type: "static" }, "/assets/uploads/2023/08/QUEENSBRIDGE.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/Roll_Up_Banner-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/Roll_Up_Banner-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/Roll_Up_Banner-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/Roll_Up_Banner-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/Roll_Up_Banner.jpg": { type: "static" }, "/assets/uploads/2023/08/Roll_Up_Banner.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-B-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-B-238x300.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-B-768x968.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-B.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-B.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-F-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-F-238x300.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-F-768x968.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-F.jpg": { type: "static" }, "/assets/uploads/2023/08/SAT-DEC-11TH-2021-F.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-BACK-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-BACK-300x217.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-BACK-768x556.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-BACK.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-BACK.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-FRONT-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-FRONT-217x300.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-FRONT.jpg": { type: "static" }, "/assets/uploads/2023/08/SUNDAY-MAY-1ST-2022-FRONT.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-APRIL-14TH-BACKv2-1024x741.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-APRIL-14TH-BACKv2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-APRIL-14TH-BACKv2-300x217.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-APRIL-14TH-BACKv2-768x556.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-APRIL-14TH-BACKv2.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-APRIL-14TH-BACKv2.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-NOV-10TH-2022-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-NOV-10TH-2022-217x300.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-NOV-10TH-2022.jpg": { type: "static" }, "/assets/uploads/2023/08/THURSDAY-NOV-10TH-2022.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/YOUR-CITY-IS-MINEv2-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/YOUR-CITY-IS-MINEv2-217x300.jpg": { type: "static" }, "/assets/uploads/2023/08/YOUR-CITY-IS-MINEv2.jpg": { type: "static" }, "/assets/uploads/2023/08/YOUR-CITY-IS-MINEv2.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/bcmockup-1024x864.jpg": { type: "static" }, "/assets/uploads/2023/08/bcmockup-1024x864.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/bcmockup-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/bcmockup-1536x1297.jpg": { type: "static" }, "/assets/uploads/2023/08/bcmockup-1536x1297.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/bcmockup-300x253.jpg": { type: "static" }, "/assets/uploads/2023/08/bcmockup-300x253.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/bcmockup-768x648.jpg": { type: "static" }, "/assets/uploads/2023/08/bcmockup-768x648.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/bcmockup-scaled.jpg": { type: "static" }, "/assets/uploads/2023/08/bcmockup-scaled.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/bcmockup.jpg": { type: "static" }, "/assets/uploads/2023/08/carro-1024x701.jpg": { type: "static" }, "/assets/uploads/2023/08/carro-1024x701.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/carro-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/carro-300x205.jpg": { type: "static" }, "/assets/uploads/2023/08/carro-300x205.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/carro-768x526.jpg": { type: "static" }, "/assets/uploads/2023/08/carro-768x526.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/carro.jpg": { type: "static" }, "/assets/uploads/2023/08/carro.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/cozuna-red-logo.svg": { type: "static" }, "/assets/uploads/2023/08/crossway_business_card-1024x739.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_business_card-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_business_card-300x217.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_business_card-768x554.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_business_card.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_business_card.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/crossway_flag-1024x756.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_flag-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_flag-300x222.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_flag-768x567.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_flag.jpg": { type: "static" }, "/assets/uploads/2023/08/crossway_flag.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter-1536x1024.jpg": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter.jpg": { type: "static" }, "/assets/uploads/2023/08/logo_mockup_letter.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/08/reseind-logo-1024x867.jpg": { type: "static" }, "/assets/uploads/2023/08/reseind-logo-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/reseind-logo-1536x1301.jpg": { type: "static" }, "/assets/uploads/2023/08/reseind-logo-300x254.jpg": { type: "static" }, "/assets/uploads/2023/08/reseind-logo-768x650.jpg": { type: "static" }, "/assets/uploads/2023/08/reseind-logo.jpg": { type: "static" }, "/assets/uploads/2023/08/reseind-logo.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/sign_mockup-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup-1536x1024.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup-2048x1365.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup.jpg": { type: "static" }, "/assets/uploads/2023/08/sign_mockup.jpg.webp": { type: "static" }, "/assets/uploads/2023/08/wall_mockup-1024x683.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup-1536x1024.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup-2048x1365.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup-300x200.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup-768x512.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup.jpg": { type: "static" }, "/assets/uploads/2023/08/wall_mockup.jpg.webp.json": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup-1024x681.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup-150x150.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup-1536x1021.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup-2048x1361.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup-300x199.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup-768x510.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup.jpg": { type: "static" }, "/assets/uploads/2023/08/white_cap_mockup.jpg.webp": { type: "static" }, "/assets/uploads/2024/10/cozuna.svg": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-1117x1536.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-1489x2048.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-218x300.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-745x1024.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-768x1056.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1-scaled.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-1.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-1117x1536.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-1489x2048.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-218x300.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-745x1024.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-768x1056.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2-scaled.webp": { type: "static" }, "/assets/uploads/2024/12/Berchicci-Beach-Towel-Final-2.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-1024x844.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-1536x1265.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-300x247.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-768x633.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-v1-1024x844.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-v1-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-v1-1536x1265.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-v1-300x247.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-v1-768x633.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template-v1.webp": { type: "static" }, "/assets/uploads/2024/12/Children-Shoe-Box-Template.webp": { type: "static" }, "/assets/uploads/2024/12/Classico-Socks-Header-Card-1024x663.webp": { type: "static" }, "/assets/uploads/2024/12/Classico-Socks-Header-Card-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Classico-Socks-Header-Card-300x194.webp": { type: "static" }, "/assets/uploads/2024/12/Classico-Socks-Header-Card-768x497.webp": { type: "static" }, "/assets/uploads/2024/12/Classico-Socks-Header-Card.webp": { type: "static" }, "/assets/uploads/2024/12/Generic-Outside-Tag-1024x663.webp": { type: "static" }, "/assets/uploads/2024/12/Generic-Outside-Tag-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Generic-Outside-Tag-300x194.webp": { type: "static" }, "/assets/uploads/2024/12/Generic-Outside-Tag-768x497.webp": { type: "static" }, "/assets/uploads/2024/12/Generic-Outside-Tag.webp": { type: "static" }, "/assets/uploads/2024/12/Shin-Guard-150x150.webp": { type: "static" }, "/assets/uploads/2024/12/Shin-Guard-300x232.webp": { type: "static" }, "/assets/uploads/2024/12/Shin-Guard-768x593.webp": { type: "static" }, "/assets/uploads/2024/12/Shin-Guard.webp": { type: "static" }, "/assets/uploads/2026/02/CV.pdf": { type: "static" }, "/assets/uploads/blocksy/css/global.css": { type: "static" }, "/assets/uploads/elementor/google-fonts/css/archivoblack.css": { type: "static" }, "/assets/uploads/elementor/google-fonts/css/raleway.css": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/archivoblack-htxql289nzcgg4mzn6kj7ew6cykf_i7y.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/archivoblack-htxql289nzcgg4mzn6kj7ew6cyyf_g.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptsg8zys_skggpnycg4q4fqpfe.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptsg8zys_skggpnycg4qifqpfe.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptsg8zys_skggpnycg4qofqpfe.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptsg8zys_skggpnycg4syfqpfe.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptsg8zys_skggpnycg4tyfq.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptug8zys_skggpnyc0itw.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptug8zys_skggpnycait5lu.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptug8zys_skggpnyciit5lu.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptug8zys_skggpnyckit5lu.woff2": { type: "static" }, "/assets/uploads/elementor/google-fonts/fonts/raleway-1ptug8zys_skggpnycmit5lu.woff2": { type: "static" }, "/assets/uploads/elementor/screenshots/Elementor-post-screenshot_368_2023-08-02-15-05-53_766851e4.png": { type: "static" }, "/assets/uploads/elementor/screenshots/index.html": { type: "static" }, "/assets/uploads/turpone-foods.webp": { type: "static" }, "/assets/videos/designer-working.mp4": { type: "static" }, "/carlos-ozuna-cv.pdf": { type: "static" }, "/favicon.svg": { type: "static" }, "/about": { type: "function", entrypoint: "__next-on-pages-dist__/functions/about.func.js" }, "/about.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/about.func.js" }, "/index": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/index.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/work/[slug]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/work/[slug].func.js" }, "/work/[slug].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/work/[slug].func.js" }, "/work": { type: "function", entrypoint: "__next-on-pages-dist__/functions/work.func.js" }, "/work.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/work.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/admin/categories.html": { type: "override", path: "/admin/categories.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/categories": { type: "override", path: "/admin/categories.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/categories.rsc": { type: "override", path: "/admin/categories.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin/dashboard.html": { type: "override", path: "/admin/dashboard.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/dashboard/layout,_N_T_/admin/dashboard/page,_N_T_/admin/dashboard", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/dashboard": { type: "override", path: "/admin/dashboard.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/dashboard/layout,_N_T_/admin/dashboard/page,_N_T_/admin/dashboard", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/dashboard.rsc": { type: "override", path: "/admin/dashboard.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/dashboard/layout,_N_T_/admin/dashboard/page,_N_T_/admin/dashboard", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin/pages.html": { type: "override", path: "/admin/pages.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/pages/layout,_N_T_/admin/pages/page,_N_T_/admin/pages", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/pages": { type: "override", path: "/admin/pages.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/pages/layout,_N_T_/admin/pages/page,_N_T_/admin/pages", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/pages.rsc": { type: "override", path: "/admin/pages.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/pages/layout,_N_T_/admin/pages/page,_N_T_/admin/pages", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin/profile.html": { type: "override", path: "/admin/profile.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/profile/layout,_N_T_/admin/profile/page,_N_T_/admin/profile", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/profile": { type: "override", path: "/admin/profile.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/profile/layout,_N_T_/admin/profile/page,_N_T_/admin/profile", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/profile.rsc": { type: "override", path: "/admin/profile.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/profile/layout,_N_T_/admin/profile/page,_N_T_/admin/profile", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin/projects/edit.html": { type: "override", path: "/admin/projects/edit.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/edit/layout,_N_T_/admin/projects/edit/page,_N_T_/admin/projects/edit", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/projects/edit": { type: "override", path: "/admin/projects/edit.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/edit/layout,_N_T_/admin/projects/edit/page,_N_T_/admin/projects/edit", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/projects/edit.rsc": { type: "override", path: "/admin/projects/edit.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/edit/layout,_N_T_/admin/projects/edit/page,_N_T_/admin/projects/edit", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin/projects/new.html": { type: "override", path: "/admin/projects/new.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/new/layout,_N_T_/admin/projects/new/page,_N_T_/admin/projects/new", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/projects/new": { type: "override", path: "/admin/projects/new.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/new/layout,_N_T_/admin/projects/new/page,_N_T_/admin/projects/new", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/projects/new.rsc": { type: "override", path: "/admin/projects/new.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/new/layout,_N_T_/admin/projects/new/page,_N_T_/admin/projects/new", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin/projects.html": { type: "override", path: "/admin/projects.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/page,_N_T_/admin/projects", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/projects": { type: "override", path: "/admin/projects.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/page,_N_T_/admin/projects", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin/projects.rsc": { type: "override", path: "/admin/projects.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/projects/layout,_N_T_/admin/projects/page,_N_T_/admin/projects", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/admin.html": { type: "override", path: "/admin.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin": { type: "override", path: "/admin.html", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } }, "/admin.rsc": { type: "override", path: "/admin.rsc", headers: { "x-nextjs-stale-time": "4294967294", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", "content-type": "text/x-component" } }, "/favicon.ico": { type: "override", path: "/favicon.ico", headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" } } };
});
var U = I((Ks, q) => {
  "use strict";
  l();
  r();
  u();
  function f(s, t) {
    s = String(s || "").trim();
    let a = s, e, o = "";
    if (/^[^a-zA-Z\\\s]/.test(s)) {
      e = s[0];
      let c = s.lastIndexOf(e);
      o += s.substring(c + 1), s = s.substring(1, c);
    }
    let p = 0;
    return s = us(s, (c) => {
      if (/^\(\?[P<']/.test(c)) {
        let n = /^\(\?P?[<']([^>']+)[>']/.exec(c);
        if (!n) throw new Error(`Failed to extract named captures from ${JSON.stringify(c)}`);
        let d = c.substring(n[0].length, c.length - 1);
        return t && (t[p] = n[1]), p++, `(${d})`;
      }
      return c.substring(0, 3) === "(?:" || p++, c;
    }), s = s.replace(/\[:([^:]+):\]/g, (c, n) => f.characterClasses[n] || c), new f.PCRE(s, o, a, o, e);
  }
  __name(f, "f");
  function us(s, t) {
    let a = 0, e = 0, o = false;
    for (let i = 0; i < s.length; i++) {
      let p = s[i];
      if (o) {
        o = false;
        continue;
      }
      switch (p) {
        case "(":
          e === 0 && (a = i), e++;
          break;
        case ")":
          if (e > 0 && (e--, e === 0)) {
            let c = i + 1, n = a === 0 ? "" : s.substring(0, a), d = s.substring(c), g = String(t(s.substring(a, c)));
            s = n + g + d, i = a;
          }
          break;
        case "\\":
          o = true;
          break;
        default:
          break;
      }
    }
    return s;
  }
  __name(us, "us");
  (function(s) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(e, o, i, p, c) {
        super(e, o), this.pcrePattern = i, this.pcreFlags = p, this.delimiter = c;
      }
    }
    s.PCRE = t, s.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(f || (f = {}));
  f.prototype = f.PCRE.prototype;
  q.exports = f;
});
var X = I((L) => {
  "use strict";
  l();
  r();
  u();
  L.parse = Rs;
  L.serialize = vs;
  var ws = Object.prototype.toString, N = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Rs(s, t) {
    if (typeof s != "string") throw new TypeError("argument str must be a string");
    for (var a = {}, e = t || {}, o = e.decode || Cs, i = 0; i < s.length; ) {
      var p = s.indexOf("=", i);
      if (p === -1) break;
      var c = s.indexOf(";", i);
      if (c === -1) c = s.length;
      else if (c < p) {
        i = s.lastIndexOf(";", p - 1) + 1;
        continue;
      }
      var n = s.slice(i, p).trim();
      if (a[n] === void 0) {
        var d = s.slice(p + 1, c).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), a[n] = Ts(d, o);
      }
      i = c + 1;
    }
    return a;
  }
  __name(Rs, "Rs");
  function vs(s, t, a) {
    var e = a || {}, o = e.encode || Ss;
    if (typeof o != "function") throw new TypeError("option encode is invalid");
    if (!N.test(s)) throw new TypeError("argument name is invalid");
    var i = o(t);
    if (i && !N.test(i)) throw new TypeError("argument val is invalid");
    var p = s + "=" + i;
    if (e.maxAge != null) {
      var c = e.maxAge - 0;
      if (isNaN(c) || !isFinite(c)) throw new TypeError("option maxAge is invalid");
      p += "; Max-Age=" + Math.floor(c);
    }
    if (e.domain) {
      if (!N.test(e.domain)) throw new TypeError("option domain is invalid");
      p += "; Domain=" + e.domain;
    }
    if (e.path) {
      if (!N.test(e.path)) throw new TypeError("option path is invalid");
      p += "; Path=" + e.path;
    }
    if (e.expires) {
      var n = e.expires;
      if (!ks(n) || isNaN(n.valueOf())) throw new TypeError("option expires is invalid");
      p += "; Expires=" + n.toUTCString();
    }
    if (e.httpOnly && (p += "; HttpOnly"), e.secure && (p += "; Secure"), e.priority) {
      var d = typeof e.priority == "string" ? e.priority.toLowerCase() : e.priority;
      switch (d) {
        case "low":
          p += "; Priority=Low";
          break;
        case "medium":
          p += "; Priority=Medium";
          break;
        case "high":
          p += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (e.sameSite) {
      var g = typeof e.sameSite == "string" ? e.sameSite.toLowerCase() : e.sameSite;
      switch (g) {
        case true:
          p += "; SameSite=Strict";
          break;
        case "lax":
          p += "; SameSite=Lax";
          break;
        case "strict":
          p += "; SameSite=Strict";
          break;
        case "none":
          p += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return p;
  }
  __name(vs, "vs");
  function Cs(s) {
    return s.indexOf("%") !== -1 ? decodeURIComponent(s) : s;
  }
  __name(Cs, "Cs");
  function Ss(s) {
    return encodeURIComponent(s);
  }
  __name(Ss, "Ss");
  function ks(s) {
    return ws.call(s) === "[object Date]" || s instanceof Date;
  }
  __name(ks, "ks");
  function Ts(s, t) {
    try {
      return t(s);
    } catch {
      return s;
    }
  }
  __name(Ts, "Ts");
});
l();
r();
u();
l();
r();
u();
l();
r();
u();
var w = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
l();
r();
u();
l();
r();
u();
l();
r();
u();
l();
r();
u();
var O = H(U());
function S(s, t, a) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let e = a ? "" : "i", o = [];
  return { match: (0, O.default)(`%${s}%${e}`, o).exec(t), captureGroupKeys: o };
}
__name(S, "S");
function R(s, t, a, { namedOnly: e } = {}) {
  return s.replace(/\$([a-zA-Z0-9_]+)/g, (o, i) => {
    let p = a.indexOf(i);
    return e && p === -1 ? o : (p === -1 ? t[parseInt(i, 10)] : t[p + 1]) || "";
  });
}
__name(R, "R");
function E(s, { url: t, cookies: a, headers: e, routeDest: o }) {
  switch (s.type) {
    case "host":
      return { valid: t.hostname === s.value };
    case "header":
      return s.value !== void 0 ? z(s.value, e.get(s.key), o) : { valid: e.has(s.key) };
    case "cookie": {
      let i = a[s.key];
      return i && s.value !== void 0 ? z(s.value, i, o) : { valid: i !== void 0 };
    }
    case "query":
      return s.value !== void 0 ? z(s.value, t.searchParams.get(s.key), o) : { valid: t.searchParams.has(s.key) };
  }
}
__name(E, "E");
function z(s, t, a) {
  let { match: e, captureGroupKeys: o } = S(s, t);
  return a && e && o.length ? { valid: !!e, newRouteDest: R(a, e, o, { namedOnly: true }) } : { valid: !!e };
}
__name(z, "z");
l();
r();
u();
function V(s) {
  let t = new Headers(s.headers);
  return s.cf && (t.set("x-vercel-ip-city", encodeURIComponent(s.cf.city)), t.set("x-vercel-ip-country", s.cf.country), t.set("x-vercel-ip-country-region", s.cf.regionCode), t.set("x-vercel-ip-latitude", s.cf.latitude), t.set("x-vercel-ip-longitude", s.cf.longitude)), t.set("x-vercel-sc-host", w), new Request(s, { headers: t });
}
__name(V, "V");
l();
r();
u();
function m(s, t, a) {
  let e = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [o, i] of e) {
    let p = o.toLowerCase(), c = a?.match ? R(i, a.match, a.captureGroupKeys) : i;
    p === "set-cookie" ? s.append(p, c) : s.set(p, c);
  }
}
__name(m, "m");
function v(s) {
  return /^https?:\/\//.test(s);
}
__name(v, "v");
function b(s, t) {
  for (let [a, e] of t.entries()) {
    let o = /^nxtP(.+)$/.exec(a), i = /^nxtI(.+)$/.exec(a);
    o?.[1] ? (s.set(a, e), s.set(o[1], e)) : i?.[1] ? s.set(i[1], e.replace(/(\(\.+\))+/, "")) : (!s.has(a) || !!e && !s.getAll(a).includes(e)) && s.append(a, e);
  }
}
__name(b, "b");
function A(s, t) {
  let a = new URL(t, s.url);
  return b(a.searchParams, new URL(s.url).searchParams), a.pathname = a.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(a, s);
}
__name(A, "A");
function C(s) {
  return new Response(s.body, s);
}
__name(C, "C");
function M(s) {
  return s.split(",").map((t) => {
    let [a, e] = t.split(";"), o = parseFloat((e ?? "q=1").replace(/q *= */gi, ""));
    return [a.trim(), isNaN(o) ? 1 : o];
  }).sort((t, a) => a[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(M, "M");
l();
r();
u();
function D(s) {
  switch (s) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(D, "D");
async function k(s, { request: t, assetsFetcher: a, ctx: e }, { path: o, searchParams: i }) {
  let p, c = new URL(t.url);
  b(c.searchParams, i);
  let n = new Request(c, t);
  try {
    switch (s?.type) {
      case "function":
      case "middleware": {
        let d = await import(s.entrypoint);
        try {
          p = await d.default(n, e);
        } catch (g) {
          let h = g;
          throw h.name === "TypeError" && h.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${s.entrypoint})`) : g;
        }
        break;
      }
      case "override": {
        p = C(await a.fetch(A(n, s.path ?? o))), s.headers && m(p.headers, s.headers);
        break;
      }
      case "static": {
        p = await a.fetch(A(n, o));
        break;
      }
      default:
        p = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return C(p);
}
__name(k, "k");
function G(s, t) {
  let a = "^//?(?:", e = ")/(.*)$";
  return !s.startsWith(a) || !s.endsWith(e) ? false : s.slice(a.length, -e.length).split("|").every((i) => t.has(i));
}
__name(G, "G");
l();
r();
u();
function ds(s, { protocol: t, hostname: a, port: e, pathname: o }) {
  return !(t && s.protocol.replace(/:$/, "") !== t || !new RegExp(a).test(s.hostname) || e && !new RegExp(e).test(s.port) || o && !new RegExp(o).test(s.pathname));
}
__name(ds, "ds");
function gs(s, t) {
  if (s.method !== "GET") return;
  let { origin: a, searchParams: e } = new URL(s.url), o = e.get("url"), i = Number.parseInt(e.get("w") ?? "", 10), p = Number.parseInt(e.get("q") ?? "75", 10);
  if (!o || Number.isNaN(i) || Number.isNaN(p) || !t?.sizes?.includes(i) || p < 0 || p > 100) return;
  let c = new URL(o, a);
  if (c.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let n = o.startsWith("//"), d = o.startsWith("/") && !n;
  if (!d && !t?.domains?.includes(c.hostname) && !t?.remotePatterns?.find((_) => ds(c, _))) return;
  let g = s.headers.get("Accept") ?? "", h = t?.formats?.find((_) => g.includes(_))?.replace("image/", "");
  return { isRelative: d, imageUrl: c, options: { width: i, quality: p, format: h } };
}
__name(gs, "gs");
function ys(s, t, a) {
  let e = new Headers();
  if (a?.contentSecurityPolicy && e.set("Content-Security-Policy", a.contentSecurityPolicy), a?.contentDispositionType) {
    let i = t.pathname.split("/").pop(), p = i ? `${a.contentDispositionType}; filename="${i}"` : a.contentDispositionType;
    e.set("Content-Disposition", p);
  }
  s.headers.has("Cache-Control") || e.set("Cache-Control", `public, max-age=${a?.minimumCacheTTL ?? 60}`);
  let o = C(s);
  return m(o.headers, e), o;
}
__name(ys, "ys");
async function Y(s, { buildOutput: t, assetsFetcher: a, imagesConfig: e }) {
  let o = gs(s, e);
  if (!o) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: i, imageUrl: p } = o, n = await (i && p.pathname in t ? a.fetch.bind(a) : fetch)(p);
  return ys(n, p, e);
}
__name(Y, "Y");
l();
r();
u();
l();
r();
u();
l();
r();
u();
async function T(s) {
  return import(s);
}
__name(T, "T");
var js = "x-vercel-cache-tags";
var xs = "x-next-cache-soft-tags";
var hs = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function W(s) {
  let t = `https://${w}/v1/suspense-cache/`;
  if (!s.url.startsWith(t)) return null;
  try {
    let a = new URL(s.url), e = await ms();
    if (a.pathname === "/v1/suspense-cache/revalidate") {
      let i = a.searchParams.get("tags")?.split(",") ?? [];
      for (let p of i) await e.revalidateTag(p);
      return new Response(null, { status: 200 });
    }
    let o = a.pathname.replace("/v1/suspense-cache/", "");
    if (!o.length) return new Response("Invalid cache key", { status: 400 });
    switch (s.method) {
      case "GET": {
        let i = K(s, xs), p = await e.get(o, { softTags: i });
        return p ? new Response(JSON.stringify(p.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (p.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let i = globalThis[hs], p = /* @__PURE__ */ __name(async () => {
          let c = await s.json();
          c.data.tags === void 0 && (c.tags ??= K(s, js) ?? []), await e.set(o, c);
        }, "p");
        return i ? i.ctx.waitUntil(p()) : await p(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (a) {
    return console.error(a), new Response("Error handling cache request", { status: 500 });
  }
}
__name(W, "W");
async function ms() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? $("kv") : $("cache-api");
}
__name(ms, "ms");
async function $(s) {
  let t = `./__next-on-pages-dist__/cache/${s}.js`, a = await T(t);
  return new a.default();
}
__name($, "$");
function K(s, t) {
  return s.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(K, "K");
function Z() {
  globalThis[J] || (bs(), globalThis[J] = true);
}
__name(Z, "Z");
function bs() {
  let s = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let a = new Request(...t), e = await fs(a);
    return e || (e = await W(a), e) ? e : (_s(a), s(a));
  };
}
__name(bs, "bs");
async function fs(s) {
  if (s.url.startsWith("blob:")) try {
    let a = `./__next-on-pages-dist__/assets/${new URL(s.url).pathname}.bin`, e = (await T(a)).default, o = { async arrayBuffer() {
      return e;
    }, get body() {
      return new ReadableStream({ start(i) {
        let p = Buffer.from(e);
        i.enqueue(p), i.close();
      } });
    }, async text() {
      return Buffer.from(e).toString();
    }, async json() {
      let i = Buffer.from(e);
      return JSON.stringify(i.toString());
    }, async blob() {
      return new Blob(e);
    } };
    return o.clone = () => ({ ...o }), o;
  } catch {
  }
  return null;
}
__name(fs, "fs");
function _s(s) {
  s.headers.has("user-agent") || s.headers.set("user-agent", "Next.js Middleware");
}
__name(_s, "_s");
var J = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
l();
r();
u();
var Q = H(X());
var P = class {
  static {
    __name(this, "P");
  }
  constructor(t, a, e, o, i) {
    this.routes = t;
    this.output = a;
    this.reqCtx = e;
    this.url = new URL(e.request.url), this.cookies = (0, Q.parse)(e.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), b(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = i?.find((p) => p.domain === this.url.hostname), this.locales = new Set(o.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: a, checkIntercept: e }) {
    let o = S(t.src, this.path, t.caseSensitive);
    if (!o.match || t.methods && !t.methods.map((p) => p.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let i = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((p) => {
      let c = E(p, i);
      return c.newRouteDest && (i.routeDest = c.newRouteDest), !c.valid;
    }) && !t.missing?.find((p) => E(p, i).valid) && !(a && t.status !== this.status)) {
      if (e && t.dest) {
        let p = /\/(\(\.+\))+/, c = p.test(t.dest), n = p.test(this.path);
        if (c && !n) return;
      }
      return { routeMatch: o, routeDest: i.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let a = "x-middleware-override-headers", e = t.headers.get(a);
    if (e) {
      let n = new Set(e.split(",").map((d) => d.trim()));
      for (let d of n.keys()) {
        let g = `x-middleware-request-${d}`, h = t.headers.get(g);
        this.reqCtx.request.headers.get(d) !== h && (h ? this.reqCtx.request.headers.set(d, h) : this.reqCtx.request.headers.delete(d)), t.headers.delete(g);
      }
      t.headers.delete(a);
    }
    let o = "x-middleware-rewrite", i = t.headers.get(o);
    if (i) {
      let n = new URL(i, this.url), d = this.url.hostname !== n.hostname;
      this.path = d ? `${n}` : n.pathname, b(this.searchParams, n.searchParams), t.headers.delete(o);
    }
    let p = "x-middleware-next";
    t.headers.get(p) ? t.headers.delete(p) : !i && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), m(this.reqCtx.request.headers, t.headers), m(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let a = t && this.output[t];
    if (!a || a.type !== "middleware") return this.status = 500, false;
    let e = await k(a, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), e.status === 500 ? (this.status = e.status, false) : (this.processMiddlewareResp(e), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, a, e) {
    !t.headers || (m(this.headers.normal, t.headers, { match: a, captureGroupKeys: e }), t.important && m(this.headers.important, t.headers, { match: a, captureGroupKeys: e }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, a, e) {
    if (!t.dest) return this.path;
    let o = this.path, i = t.dest;
    this.wildcardMatch && /\$wildcard/.test(i) && (i = i.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = R(i, a, e);
    let p = /\/index\.rsc$/i.test(this.path), c = /^\/(?:index)?$/i.test(o), n = /^\/__index\.prefetch\.rsc$/i.test(o);
    p && !c && !n && (this.path = o);
    let d = /\.rsc$/i.test(this.path), g = /\.prefetch\.rsc$/i.test(this.path), h = this.path in this.output;
    d && !g && !h && (this.path = this.path.replace(/\.rsc/i, ""));
    let _ = new URL(this.path, this.url);
    return b(this.searchParams, _.searchParams), v(this.path) || (this.path = _.pathname), o;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: e, cookie: o } } = t, i = o && this.cookies[o], p = M(i ?? ""), c = M(this.reqCtx.request.headers.get("accept-language") ?? ""), g = [...p, ...c].map((h) => e[h]).filter(Boolean)[0];
    if (g) {
      !this.path.startsWith(g) && (this.headers.normal.set("location", g), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, a) {
    return !this.locales || a !== "miss" ? t : G(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, a) {
    let e = this.getLocaleFriendlyRoute(a, t), { routeMatch: o, routeDest: i } = this.checkRouteMatch(e, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, p = { ...e, dest: i };
    if (!o?.match || p.middlewarePath && this.middlewareInvoked.includes(p.middlewarePath)) return "skip";
    let { match: c, captureGroupKeys: n } = o;
    if (this.applyRouteOverrides(p), this.applyLocaleRedirects(p), !await this.runRouteMiddleware(p.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(p, c, n), this.applyRouteStatus(p);
    let g = this.applyRouteDest(p, c, n);
    if (p.check && !v(this.path)) if (g === this.path) {
      if (t !== "miss") return this.checkPhase(D(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !p.continue || p.status && p.status >= 300 && p.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let a = true;
    for (let i of this.routes[t]) {
      let p = await this.checkRoute(t, i);
      if (p === "error") return "error";
      if (p === "done") {
        a = false;
        break;
      }
    }
    if (t === "hit" || v(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let i of this.locales) {
      let p = new RegExp(`/${i}(/.*)`), n = this.path.match(p)?.[1];
      if (n && n in this.output) {
        this.path = n;
        break;
      }
    }
    let e = this.path in this.output;
    if (!e && this.path.endsWith("/")) {
      let i = this.path.replace(/\/$/, "");
      e = i in this.output, e && (this.path = i);
    }
    if (t === "miss" && !e) {
      let i = !this.status || this.status < 400;
      this.status = i ? 404 : this.status;
    }
    let o = "miss";
    return e || t === "miss" || t === "error" ? o = "hit" : a && (o = D(t)), this.checkPhase(o);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let a = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), a;
  }
};
async function ss(s, t, a, e) {
  let o = new P(t.routes, a, s, e, t.wildcard), i = await ts(o);
  return Ns(s, i, a);
}
__name(ss, "ss");
async function ts(s, t = "none", a = false) {
  return await s.run(t) === "error" || !a && s.status && s.status >= 400 ? ts(s, "error", true) : { path: s.path, status: s.status, headers: s.headers, searchParams: s.searchParams, body: s.body };
}
__name(ts, "ts");
async function Ns(s, { path: t = "/404", status: a, headers: e, searchParams: o, body: i }, p) {
  let c = e.normal.get("location");
  if (c) {
    if (c !== e.middlewareLocation) {
      let g = [...o.keys()].length ? `?${o.toString()}` : "";
      e.normal.set("location", `${c ?? "/"}${g}`);
    }
    return new Response(null, { status: a, headers: e.normal });
  }
  let n;
  if (i !== void 0) n = new Response(i, { status: a });
  else if (v(t)) {
    let g = new URL(t);
    b(g.searchParams, o), n = await fetch(g, s.request);
  } else n = await k(p[t], s, { path: t, status: a, headers: e, searchParams: o });
  let d = e.normal;
  return m(d, n.headers), m(d, e.important), n = new Response(n.body, { ...n, status: a || n.status, headers: d }), n;
}
__name(Ns, "Ns");
l();
r();
u();
function es() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ps };
}
__name(es, "es");
function Ps(s) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(s);
  if (t) return t;
  let a = Bs();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(s, a), a;
}
__name(Ps, "Ps");
function Bs() {
  let s = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, a) => s.has(a) ? s.get(a) : Reflect.get(globalThis, a), "get"), set: /* @__PURE__ */ __name((t, a, e) => zs.has(a) ? Reflect.set(globalThis, a, e) : (s.set(a, e), true), "set") });
}
__name(Bs, "Bs");
var zs = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Es = Object.defineProperty;
var As = /* @__PURE__ */ __name((...s) => {
  let t = s[0], a = s[1], e = "__import_unsupported";
  if (!(a === e && typeof t == "object" && t !== null && e in t)) return Es(...s);
}, "As");
globalThis.Object.defineProperty = As;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var Ce = { async fetch(s, t, a) {
  es(), Z();
  let e = await __ALSes_PROMISE__;
  if (!e) {
    let p = new URL(s.url), c = await t.ASSETS.fetch(`${p.protocol}//${p.host}/cdn-cgi/errors/no-nodejs_compat.html`), n = c.ok ? c.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(n, { status: 503 });
  }
  let { envAsyncLocalStorage: o, requestContextAsyncLocalStorage: i } = e;
  return o.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: w }, async () => i.run({ env: t, ctx: a, cf: s.cf }, async () => {
    if (new URL(s.url).pathname.startsWith("/_next/image")) return Y(s, { buildOutput: j, assetsFetcher: t.ASSETS, imagesConfig: y.images });
    let c = V(s);
    return ss({ request: c, ctx: a, assetsFetcher: t.ASSETS }, y, j, x);
  }));
} };
export {
  Ce as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.6255433936258441.mjs.map
