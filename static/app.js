const BASE_URL = "http://localhost:5000/api";

function addCupcakeHTML(cupcake){
    return `
    <div data-id = ${cupcake.id}>
    <li>
    ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
    <button class="delete">Del</button>
    <img class="img" src="${cupcake.image}" alt="">
    </li>
    </div>
    `
}

async function getCupcakes(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcake of response.data.cupcakes){
        let newCupcake = addCupcakeHTML(cupcake);
        $("#cupcakes-list").append(newCupcake);

    };
};

$("#new-cupcake").on("submit", async function (evt) {
    evt.preventDefault();

    let flavor = $("#flavor").val()
    let rating = $("#rating").val()
    let size = $("#size").val();
    let image = $("#image").val();

    const response = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = addCupcakeHTML(response.data.cupcake)
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete", async function(evt){
    evt.preventDefault();
    let cupcake = $(evt.target).closest("div")
    let id = cupcake.attr("data-id")
    await axios.delete(`${BASE_URL}/cupcakes/${id}`)
    cupcake.remove()
})

getCupcakes();