const create_form = document.getElementById("create-product");

// image url input
const product_image_url = document.getElementById("product-image-url");

// product names inputs
const product_english_name = document.getElementById("product-english-name");
const product_tamil_name = document.getElementById("product-tamil-name");

// product description textarea
const product_description = document.getElementById("product-description");

// healthy part

const protein_input = document.getElementById("product-protein");
const protein_unit = document.getElementById("product-protein-unit");

const carbo_input = document.getElementById("product-carbo");
const carbo_unit = document.getElementById("product-carbo-unit");

const kcal_input = document.getElementById("product-kcal");

// available stock
const available_stock_input = document.getElementById(
  "product-available-stock"
);

// quantity and price
const quantity_input = document.getElementById("weight-number");

// quantity unit select
const quantity_unit_select = document.getElementById("weight-unit");

// quantity price
const quantity_price_input = document.getElementById("quantity-price");

// farmer user id
const farmer_user_id = document.getElementById("farmer-user-id");

// farmer name
const farmer_name = document.getElementById("farmer-name");

// farmer image url
const famer_image_url = document.getElementById("farmer-image-url");

// get buttons by id

const add_quantity_price = document.getElementById("add-quantity-price");

// delete the already price list available in the localstorage

window.onload = localStorage.removeItem("price_list");

// add the quantity and price list

add_quantity_price.addEventListener("click", (e) => {
  e.preventDefault();

  const price_list = JSON.parse(localStorage.getItem("price_list")) ?? [];

  const quantity_input_value = quantity_input.value.trim();

  const selectedValue = quantity_unit_select.value;

  const quantity_price_input_value = quantity_price_input.value.trim();

  let new_obj;

  if (selectedValue === "kg") {
    const into_gram = quantity_input_value * 1000;

    new_obj = {
      text:
        `${quantity_input_value + selectedValue} - ` +
        `₹${quantity_price_input_value}`,
      unit: selectedValue,
      qty: quantity_input_value,
      rs: quantity_price_input_value,
      into_gram,
    };
  } else {
    new_obj = {
      text:
        `${quantity_input_value + selectedValue} - ` +
        `₹${quantity_price_input_value}`,
      unit: selectedValue,
      qty: quantity_input_value,
      rs: quantity_price_input_value,
    };
  }

  let price_list_check = true;

  price_list.find((obj) => {
    if (quantity_input_value == obj.qty) {
      price_list_check = false;
    }
  });

  if (price_list_check) {
    if (quantity_input_value !== "" && quantity_price_input_value !== "") {
      price_list.push(new_obj);

      localStorage.setItem("price_list", JSON.stringify(price_list));

      displaypricelist();

      Notify.success("Quantity Added");
    } else {
      Notify.error("Enter Valid quanity and price");
    }
  } else {
    Notify.error(
      `Already` + ` ${quantity_input_value}${selectedValue} ` + `Added`
    );
  }
});

// dispaly the quantity and pricelist in the web page

function displaypricelist() {
  let output = "";

  const list_show = document.querySelector(".quantity-price-list");

  const list_type = JSON.parse(localStorage.getItem("price_list"));

  if (list_type !== null) {
    list_type.forEach((element, index) => {
      output += `<div class="quantity_price_list_item">
            <p class="quantity_price_p">${element.text}</p>
            <button class="quantity_price_delete" onclick="deletepricelist(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    });

    list_show.innerHTML = output;
  }
}

displaypricelist();

// delete the each list item while click
function deletepricelist(index) {
  const localitems = JSON.parse(localStorage.getItem("price_list"));

  localitems.splice(index, 1);

  localStorage.setItem("price_list", JSON.stringify(localitems));

  Notify.success("Quantity Deleted");

  displaypricelist();
}

// for english name input field

// store the create product details
create_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const all_products = JSON.parse(localStorage.getItem("product_list"));

  const price_list = JSON.parse(localStorage.getItem("price_list"));

  const product_list = JSON.parse(localStorage.getItem("product_list")) ?? [];

  const image_url = product_image_url.value.trim();

  const english_name = product_english_name.value.trim();

  const tamil_name = product_tamil_name.value.trim();

  const category_id = document.querySelector(
    'input[name="pro_cat"]:checked'
  ).value;

  let cat_name = "";

  if (category_id === "01") {
    cat_name += "Exotic Fruits";
  }

  if (category_id === "02") {
    cat_name += "Exotic Veggies";
  }

  if (category_id === "03") {
    cat_name += "Fresh Veggies";
  }

  if (category_id === "04") {
    cat_name += "Fresh Fruits";
  }

  if (category_id === "05") {
    cat_name += "Leafy Green";
  }

  if (category_id === "06") {
    cat_name += "Tubers";
  }

  const category_name = cat_name;

  const product_desc = product_description.value.trim();

  const protein_value = protein_input.value.trim();

  const protein_unit_value = protein_unit.value.trim();

  const carbon_value = carbo_input.value.trim();

  const carbo_unit_value = carbo_unit.value.trim();

  const kcal_input_value = kcal_input.value.trim();

  const available_stock_input_value = available_stock_input.value.trim();

  const available_stock_unit_value = document.querySelector(
    'input[name="aval_unit"]:checked'
  ).value;

  const farmer_user_id_value = farmer_user_id.value.trim();

  const farmer_name_value = farmer_name.value.trim();

  const farmer_image_url_value = famer_image_url.value.trim();

  let new_obj;

  if (available_stock_unit_value == "kg") {
    const into_gram = available_stock_input_value * 1000;

    new_obj = {
      avail_num: available_stock_input_value,
      avail_unit: available_stock_unit_value,
      into_gram,
    };
  } else {
    new_obj = {
      avail_num: available_stock_input_value,
      avail_unit: available_stock_unit_value,
    };
  }

  let check = false;

  if (all_products !== null) {
    all_products.find((obj) => {
      if (obj.name.eng === english_name) {
        check = true;
      }
    });
  }

  if (price_list === null || price_list === undefined) {
    Notify.error("Please Add product quantity and price");
  } else if (check) {
    Notify.error(`Product` + ` ${english_name} ` + `already available`);
  } else {
    product_list.push({
      id: product_list.length * 2 * 2 + 1,

      name: {
        eng: english_name,
        tam: tamil_name,
      },

      image: {
        source: image_url,
        alt: english_name,
      },

      category: {
        id: category_id,
        name: category_name,
      },

      description: product_desc,

      nutritions: {
        protein: {
          num: protein_value,
          unit: protein_unit_value,
        },
        carbo: {
          num: carbon_value,
          unit: carbo_unit_value,
        },

        kcal: kcal_input_value,
      },

      avail_stock: new_obj,

      quantity: price_list,

      status: true,

      farmer: {
        id: farmer_user_id_value,
        name: farmer_name_value,
        image: {
          source: farmer_image_url_value,
          alt: farmer_name_value,
        },
      },
    });

    localStorage.setItem("product_list", JSON.stringify(product_list));

    Notify.success("Product Added");

    self.location.assign(window.location);
  }
});
