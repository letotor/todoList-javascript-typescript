export default ()=>
    ` <div class="bg-blue-500 justify-center flex">
    <ul class="p-4 text-center lg:max-w-lg flex flex-col " id="list">

      <li class="border-2 rounded-lg border-green-500 overflow-hidden my-4 flex-wrap">
        <div class="flex flex-row justify-between p-2 gap-4 ">
          <!-- select radio button -->
          <div class="flex items-center mb-4">
            <input class="bg-green-200 checked:bg-green-600 h-8 w-8  " type="checkbox" id="test1" />
            <label class="bg-green-500 text-green-200" for="test1" aria-describedby="label"></label>
          </div>

          <div class="flex-auto justify-center">
            <p class="text-center text-3xl  text-white mx-4">titre</p>
            <p class="text-justify line-clamp-4 hover:line-clamp-none">ajouter une description</p>
          
          </div>

          <div class="flex items-center gap-2 flex-auto">
            <button class="box-decoration-slice border-green-500 border bg-green-500 rounded text-white p-2">
              editer
            </button>
            <button class="box-decoration-slice border-red-500 border bg-red-500 rounded text-white p-2">
              Supprimer
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
`;
