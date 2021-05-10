const { TelegramClient } = gramjs;
const { StringSession } = gramjs.sessions;
const { Logger } = gramjs.extensions;

Logger.setLevel("none");

const datacenters = {
  DC1: { v4: "149.154.175.53", v6: "2001:b28:f23d:f001::a" },
  DC2: { v4: "149.154.167.51", v6: "2001:67c:4e8:f002::a" },
  DC3: { v4: "149.154.175.100", v6: "2001:b28:f23d:f003::a" },
  DC4: { v4: "149.154.167.91", v6: "2001:67c:4e8:f004::a" },
  DC5: { v4: "91.108.56.130", v6: "2001:b28:f23f:f005::a" },
  TDC1: { v4: "149.154.175.10", v6: "2001:b28:f23d:f001::e" },
  TDC2: { v4: "149.154.167.40", v6: "2001:67c:4e8:f002::e" },
  TDC3: { v4: "149.154.175.117", v6: "2001:b28:f23d:f003::e" },
};

const getServerAddress = (dcId, port) => {
  return datacenters[`DC${dcId}`].v4;
};

var resolveCode;
var resolvePassword;
const errorModal = new bootstrap.Modal(document.querySelector("#errorModal"));

const showError = (text) => {
  document.querySelector("#errorModalBody").innerHTML = text;
  errorModal.show();
};

const startLoading = () => {
  document.querySelector("#loader svg").style.width = "100px";
  document.querySelector("#loader").style.height = "100%";
};

const stopLoading = () => {
  document.querySelector("#loader svg").style.width = "0";
  document.querySelector("#loader").style.height = "0";
};

const hideAll = () => {
  const children = document.querySelector(".container").children;

  for (let child in children) {
    child = children[child];

    if (child && child.style) child.style.display = "none";
  }
};

const showCodeInput = () => {
  hideAll();
  document.querySelector("#code").style.display = "block";
  document.querySelector("#codeb").style.display = "block";
};

const showPasswordInput = () => {
  hideAll();
  document.querySelector("#password").style.display = "block";
  document.querySelector("#passwordb").style.display = "block";
};

const showResult = () => {
  document.querySelector("#password").style.display = "none";
  document.querySelector("#passwordb").style.display = "none";
  document.querySelector("#result").style.display = "block";
};

const start = async () => {
  const apiId = document.querySelector("#apiId").valueAsNumber;
  const apiHash = document.querySelector("#apiHash").value;
  const number = document.querySelector("#number").value;

  if (!apiId) {
    document.querySelector("#apiId").focus();
    return;
  } else if (!apiHash) {
    document.querySelector("#apiHash").focus();
    return;
  } else if (!number) {
    document.querySelector("#number").focus();
    return;
  }

  startLoading();

  const client = new TelegramClient(new StringSession(), apiId, apiHash, {
    connectionRetries: 5,
    useWSS: window.location.protocol == "https:",
  });

  try {
    await client.start({
      phoneNumber: number,
      phoneCode: () =>
        new Promise((resolve, _) => {
          resolveCode = resolve;
          showCodeInput();
          stopLoading();
        }),
      password: () =>
        new Promise((resolve, _) => {
          resolvePassword = resolve;
          showPasswordInput();
          stopLoading();
        }),
      onError: (error) => {
        stopLoading();
        showError(error.toString());
      },
    });
  } catch (error) {
    stopLoading();
    showError(error.toString());
    return;
  }
  client.session.setDC(
    client.session.dcId,
    getServerAddress(client.session.dcId, client.session.port),
    client.session.port
  );
  const message = `The generated string session by BSSG:\n\n${client.session.save()}`;
  await client.sendMessage("me", { message: message });

  showResult();
  stopLoading();
};

const code = () => {
  startLoading();
  resolveCode(document.querySelector("#code").value);
};

const password = () => {
  startLoading();
  resolvePassword(document.querySelector("#password").value);
};

stopLoading();
