import { options } from "../../lib/options";
import { postMessage as pm } from "../../lib/post-message";

let setup = false;

export default async () => {
  if (setup) {
    return;
  }

  setup = true;

  // keep `pm.receive` call in callback version to ensure we receive the
  // hash request
  pm.receive(async (data: any) => {
    if (data.type === "gateway:globalpayments:hash" && options.hash) {
      const hashed = await options.hash(data.data);
      pm.post(
        {
          data: hashed,
          id: data.id,
          type: "gateway:globalpayments:hash-result",
        },
        data.id,
      );
    }
  });
};
