export const backender = {
  queryUrl: 'https://sinyavsky.com/ajax/controller.php',

  ajax: async function (data, onSuccess) {
  	
    let response = await fetch(this.queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    let result = await response.json();
    onSuccess(result);    
  },

  loadPetitions: function (onSuccess, settings={}) {
    this.ajax({ ACTION: "READ", SUBJECT: "PETITION", DATA: settings}, onSuccess);
  },

  savePetition: function (petition, onSuccess) {
    const ajaxData = {
      ACTION: "CREATE",
      SUBJECT: "PETITION",
      DATA: petition
    }
    this.ajax(ajaxData, onSuccess); 
  },

  deletePetition: function (id, onSuccess) {
    const ajaxData = {
      ACTION: "DELETE",
      SUBJECT: "PETITION",
      DATA: { ID: id }
    }
    this.ajax(ajaxData, onSuccess);
  }


};   