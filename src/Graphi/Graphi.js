import { v4 as uuidv4 } from 'uuid';
class Modal {
  typeScheme = {};
  incrementalIdCounter=0
  incrementalId=true
  entries = [
   
  ];
  relations = [];
  constructor(typeScheme = {},incremenetalId = true) {
    this.typeScheme = typeScheme;
    this.incrementalId = incremenetalId;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      resolve(this.entries);
    });
  }
  findById(id) {
    return new Promise((resolve, reject) => {
      let filteredEntry = this.entries.find((e) => id === e._id);
      resolve(filteredEntry);
    });
  }

  find(query,page,limit) {
    return new Promise((resolve, reject) => {

      this.checkTypeIncludes(query.where);

      const filteredEntries = this.entries.filter((e) => {

        let finded = false;
        Object.keys(query.where).every((q) => {

          switch (this.typeScheme[q].type) {
            case "number":
              finded = e[q] > query.where[q][0] && e[q] < query.where[q][1] ? true: finded;
              break;
            case "string":
              finded = e[q]?.startsWith(query.where[q]) ? true : finded;
              break;
          }
        });

        return finded;

      });
      if(page && limit ) {
        resolve(filteredEntries.slice((page - 1) * limit, page * limit));
      }else {
        resolve(filteredEntries);
      }
    });
  }
  create(entry) {
    this.checkTypeExact(entry);
    return new Promise((resolve, reject) => {
      entry._id = this.incrementalId ? this.incrementalIdCounter++ : uuidv4();
      entry.relations = [];
      this.entries.push(entry);
      resolve(entry);
    });
  }
  addRelation(id, interaction, modal, modalId) {
    return new Promise((resolve, reject) => {
      let entryIndex = this.entries.findIndex((e) => id === e._id);
      let entry = this.entries[entryIndex];
      let relation = {
        interaction,
        modal,
        modalId,
      };
      const relationExists = entry.relations.every(
        (e) => JSON.stringify(e) === JSON.stringify(relation)
      );
      if (entry.relations.length > 0 && relationExists) {
        throw new Error("Relation Already Exists!");
      }
      entry.relations.push(relation);
      this.entries[entryIndex] = entry;
      resolve({
        success:true,
        data:{}
      });
    });
  }
  update(id, entry) {
    return new Promise((resolve, reject) => {
      this.checkTypeIncludes(entry);
      let entryIndex = this.entries.findIndex((e) => id === e._id);
      this.entries[entryIndex] = {
        ...this.entries[entryIndex],
        ...entry,
      };
      console.log(this.entries[entryIndex])
      console.log(entry)
      console.log(this.entries)
      resolve(this.entries[entryIndex]);
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      const entryIndex = this.entries.findIndex((e) => id === e._id);
      this.entries.splice(entryIndex, 1);
      resolve({ id });
    });
  }
  checkTypeExact(entry) {
    var aKeys = Object.keys(this.typeScheme).sort();
    var bKeys = Object.keys(entry).sort();
    if (JSON.stringify(aKeys) !== JSON.stringify(bKeys)) {
      throw new Error("Wrong Data Type!");
    }
  }
  checkTypeIncludes(entry) {
    var typeKeys = Object.keys(this.typeScheme).sort();
    var entryKeys = Object.keys(entry).sort();
    if (!entryKeys.every((e, i) => typeKeys.includes(e))) {
      throw new Error("Wrong Data Type!");
    }
  }
}
export const Types = {
    String:"string",
    Number:"number"
}

export {Modal};