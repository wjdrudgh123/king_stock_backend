import { chkAdmin } from "../middleware";
import Catalyst from "../models/Catalyst";
import Companies from "../models/Companies";
import routes from "../routes";

export const postSearch = async (req, res) => {
  const {
    body: { value },
  } = req;

  try {
    const catalyst = await Catalyst.findOne({
      name: value,
    });
    res.send(JSON.stringify({ companies: catalyst.items }));
  } catch (e) {
    console.log(`Error on Search Catalyst: ${e}`);
    res.send(JSON.stringify({ companies: [] }));
  }
};
