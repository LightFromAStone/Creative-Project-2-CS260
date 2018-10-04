$(document).ready(function()
{
    $("#helpButton").click(function(f)
    {
        f.preventDefault();
        $("#explainationCard").attr("hidden", false);

    });

    $("#ingredientButton").click(function(e)
    {
        var searchIngredient = $("#userIngredient").val();
        e.preventDefault();
        var recipeName = $("#recipeName").val();
        var numServings = $("#servingSize").val();
        //$("#test").text("Recipe name: " + recipeName + " serving size: " + numServings);
        $("#nutritionHeader").text(recipeName + " - Nutrition per Serving");
        $("#recipeName").val(null);

        $.ajax(
        {
            url : "https://trackapi.nutritionix.com/v2/natural/nutrients",
            type : "POST",
            headers : {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-app-id': '7c28733d',
                        'x-app-key': '3e57e1b5e92bc24eb978a36faab5971e',
                        'x-remote-user-id': '0'},
            data : JSON.stringify({'query': searchIngredient}),
            dataType : "json",
            success : function(json)
            {
                console.log(json);
                var [caloriesTotal, cholesterolTotal, dietaryFiberTotal, potassiumTotal, proteinTotal, saturatedFatTotal, sodiumTotal, sugarsTotal,
                    carbsTotal, fatTotal] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 0; i < json.foods.length; ++i)
                {
                    caloriesTotal += json.foods[i].nf_calories;
                    cholesterolTotal += json.foods[i].nf_cholesterol;
                    dietaryFiberTotal += json.foods[i].nf_dietary_fiber;
                    potassiumTotal += json.foods[i].nf_potassium;
                    proteinTotal += json.foods[i].nf_protein;
                    saturatedFatTotal += json.foods[i].nf_saturated_fat;
                    sodiumTotal += json.foods[i].nf_sodium;
                    sugarsTotal += json.foods[i].nf_sugars;
                    carbsTotal += json.foods[i].nf_total_carbohydrate;
                    fatTotal += json.foods[i].nf_total_fat;

                }
                var results = "";
                
                results += '<li class="list-group-item"><strong>Calories: </strong>' + Math.round(caloriesTotal / numServings) + '</li>';
                results += '<li class="list-group-item"><strong>Total Fat: </strong>' + Math.round(fatTotal / numServings) + 'g</li>';
                results += '<li class="list-group-item"><strong>Saturated Fat: </strong>' + Math.round(saturatedFatTotal / numServings) + 'g</li>';
                results += '<li class="list-group-item"><strong>Cholesterol: </strong>' + Math.round(cholesterolTotal / numServings) + 'mg</li>';
                results += '<li class="list-group-item"><strong>Sodium: </strong>' + Math.round(sodiumTotal / numServings) + 'mg</li>';
                results += '<li class="list-group-item"><strong>Total Carbohydrates: </strong>' + Math.round(carbsTotal / numServings) + 'g</li>';
                results += '<li class="list-group-item"><strong>Dietary Fiber: </strong>' + Math.round(dietaryFiberTotal / numServings) + 'g</li>';
                results += '<li class="list-group-item"><strong>Sugars: </strong>' + Math.round(sugarsTotal / numServings) + 'g</li>';
                results += '<li class="list-group-item"><strong>Protein: </strong>' + Math.round(proteinTotal / numServings) + 'g</li>';
                results += '<li class="list-group-item"><strong>Potassium: </strong>' + Math.round(potassiumTotal / numServings) + 'mg</li>';
                $("#nutritionValues").html(results);
                $("#explainationCard").attr("hidden", true);
                $("#nutritionCard").attr("hidden", false);
            }
        });
        $("#servingSize").val(null);
    });




});