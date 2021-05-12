import { v4 as uuidv4 } from 'uuid';
class Modal {
  typeScheme = {};
  entries = [
    {
      id: 1,
      name: "ismwet",
      age: 1,
    },
  ];
  relations = [];
  constructor(typeScheme = {}) {
    this.typeScheme = typeScheme;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      resolve(this.entries);
    });
  }
  findById(id) {
    return new Promise((resolve, reject) => {
      let filteredEntry = this.entries.find((e) => id === e.id);
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
      entry._id = uuidv4();
      entry.relations = [];
      this.entries.push(entry);
      resolve(entry);
    });
  }
  addRelation(id, interaction, modal, modalId) {
    return new Promise((resolve, reject) => {
      let entry = this.entries.find((e) => id === e.id);
      let relation = {
        interaction,
        modal,
        modalId,
      };
      const relationExists = entry.relations.every(
        (e) => JSON.stringify(e) === JSON.stringify(relation)
      );
      if (relationExists) {
        throw new Error("Relation Already Exists!");
      }
      entry.relation.push(outRelation);
      this.update(id, entry);
      resolve({});
    });
  }
  update(id, entry) {
    return new Promise((resolve, reject) => {
      this.checkTypeIncludes(entry);
      let entryIndex = this.entries.findIndex((e) => id === e.id);
      this.entries[entryIndex] = {
        ...this.entries[entryIndex],
        ...entry,
      };
      resolve(this.entries[entryIndex]);
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      const entryIndex = this.entries.findIndex((e) => id === e.id);
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
// try{
//     const user = new Modal({name:{type:Graphi.String}});
//     const post = new Modal({content:"aa"});
//     let a  = await user.create({name:"ismet",age:12});
//     let b = await post.create({content:"ismet"});

//     console.log(a)
//     console.log(user.find({
//         where:{
//             age:[0,13],
//             name:"ismwet"
//         }
//     }));

// } catch(err){
//     console.log(err)
// }
export {Modal};