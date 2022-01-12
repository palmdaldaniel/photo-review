/**
 * Behöver bara pathen för det specifik documentet i det albumet
 * */

const currentAlbum = [
    {
        albumId: "albumOne",
        path: "/cat",
      },
    {
        albumId: "albumOne",
        path: "/dog",
      }
    ]

const totImgDocs = [
  {
    albumId: "albumOne",
    path: "/cat",
  },
  {
    albumId: "albumOne",
    path: "/dog",
  },
  {
    albumId: "albumTwo",
    path: "/cat",
  },

];


const path = '/cat'

const filteredDocs = totImgDocs.filter((doc) => {
                if(doc.path === path) {
                    return doc
                }

})

console.log(filteredDocs)