const {newEnforcer} = require('casbin');
const {sequelizeAdapter} = require('./config');
const {resolveUserRoles} = require('./utils');

const hasPermission = (action) => {
  return async (req, res, next) => {
    const {user = {id: 'rick@the-citadel.com', roles: ['clone']}} = req.body;
    const {asset} = req.params;
    const userRoles = resolveUserRoles(user);
    const policy = await sequelizeAdapter();
    const e = await newEnforcer('./rbac_model.conf', policy);
    // const check = await e.addPolicy("subAct");
    // console.log("🚀 :::::::: ~ return ~ e", check);
    // const allRoles = await e.getAllRoles();
    // console.log("🚀 :::::::: ~ return ~ getAllRoles", allRoles);
    // const addRoles = await e.addRoleForUser(user, "admin");
    // console.log("🚀 :::::::: ~ return ~ addRoles", addRoles);
    // const deleteRole = await e.deleteRolesForUser(user);
    // console.log("🚀 :::::::: ~ return ~ deleteRole", deleteRole);

    const pRules = [
      ["jack", "data4", "read"],
      ["katy", "data4", "write"],
      ["leyo", "data4", "read"],
      ["ham", "data4", "write"],
      ["OKham2", "Okdata14", "OKwrite2"]
    ];

    const areRulesAdded = await e.addPolicies(pRules);
    console.log("🚀 :::::::: ~ return ~ areRulesAdded", areRulesAdded)
    e.savePolicy()
    // console.log("🚀 :::::::: ~ return ~ areRulesAdded", areRulesAdded);

    // const getPolicies = await e.getPolicy();
    // console.log("🚀 :::::::: ~ return ~ getPolicies", getPolicies);
    // const p = ["eve", "data3", "read"];
    // const added = await e.addPolicy(...p);

    const allowed = await userRoles.reduce(async (perms, role) => {
      const acc = await perms;
      if (acc) return true;
      const can = await e.enforce(role, asset, action);
      if (can) return true;
    }, false);

    allowed ? next() : res.status(403).send('Forbidden').end();
  };
};

module.exports = {hasPermission};
