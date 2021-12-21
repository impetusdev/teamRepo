/* MTA Lab
Objectives:
Apply your knowledge of Javascript to solve a real world problem.
Get really good at array manipulation and JS data structures.
Activity
Create a program that models a simple subway system.

The program takes the line and stop that a user is getting on at and the line and stop that user is getting off at and prints the journey and the total number of stops for the trip in the console:

planTrip('N', 'Times Square', '6', '33rd'); // This is only a suggested function name and signature.

// console.log() shows output similar to this:
// "You must travel through the following stops on the N line: 34th, 28th, 23rd, Union Square."
// "Change at Union Square."
// "Your journey continues through the following stops: 23rd, 28th, 33rd."
// "7 stops in total."
There are 3 subway lines:
The N line has the following stops: Times Square, 34th, 28th, 23rd, Union Square, and 8th
The L line has the following stops: 8th, 6th, Union Square, 3rd, and 1st
The 6 line has the following stops: Grand Central, 33rd, 28th, 23rd, Union Square, and Astor Place.
All 3 subway lines intersect at Union Square, but there are no other intersection points. (For example, 
    this means the 28th stop on the N line is different than the 28th street stop on the 6 line, 
    so you might need to differentiate this when you name your stops in the arrays.)
Tell the user the number of stops AND the stops IN ORDER that they will pass through or change at.
Your trip planner must work in either direction, 
i.e. planTrip('N', 'Times Square', '6', '33rd')(starting at Times Square) should work as well as the reverse trip planTrip('6', '33rd', 'N', 'Times Square') (starting at 33rd).
Hints:

Work out how you would do it on paper first! Then start to explain that process in Javascript.
👉 Get the program to work for a single line (in any direction) before trying to tackle multiple lines. 👈
Don't worry about prompting the user for input. Hard code some test-run calls to the tip planning function to make it fast to test your code.
Consider diagramming the lines by sketching out the subway lines and their stops and intersection.
The key to the lab is finding the index positions of each stop. (hint: indexOf())
Depending on what kind of data structures you use to represent the lines and stations, you might have to make sure the stops that are the same for different lines have different names (i.e. 23rd on the N and on the 6 need to be differentiated) */

//MTA
//Only 2 things to solve the problem, and the rest is easy.
//Find index of  stops on both arrays if transfering 
//Check if the train needs to go forwards or backwards and that's it.

///////Reminder: SHOW MESSAGES IN A BETTER WAY.
const mta = {
    //Array of lines
    lineN: ["Times Square", "34th", "28th", "23rd", "Union Square", "8th", "Mascot", "Airport"],
    lineL: ["8th", "6th", "Union Square", "3rd", "1st", "North Sydney", "Central"],
    lineSix:["Grand Central", "33rd", "28th", "23rd", "North Sydney", "Union Square", "Astor Place","Green Square", "Town Hall"],
    intersection: "Union Square", 

    whereTo:function(lineFrom, stopFrom, lineTo, stopTo){
        //Stops start at 1 even tho we are not showing it. Counts where person is getting on.
        let totalStops = 1;
        //We check if the person's traveling in the same line or need to do transfer
        if(lineFrom !== lineTo){
            //We find the index of line ands stops of both arrays 
            const travel1 = this.getLinesStops(lineFrom, stopFrom);
            const travel2 = this.getLinesStops(lineTo, stopTo).reverse();
            //We count how many stops
            totalStops += travel1.length  + travel2.length
            return  `You must travel trough the fallowing stops in line ${lineFrom}
                    \n ${travel1.join("\n ")} 
                    \n Change at ${this.intersection} to Line ${lineTo} 
                    \n Your journey continues through the following stops:
                    \n ${travel2.join("\n ")}
                    \n Last Stop: ${stopTo}
                    \n Total statos ${totalStops}`             
        }
        //We just need 1 Array since's traveling on the same line
        const travel1 = this.getLinesStops(lineFrom, stopFrom, stopTo);
        totalStops += travel1.length
        return `You must travel trough the fallowing stops in line ${lineFrom}
                \n ${travel1.join("\n ")} 
                \n Last Stop: ${stopTo}
    ]           \n Total statos ${totalStops}`;
    
    },
    
    getLinesStops:function(line, stopFrom, stopTo = this.intersection){// Union Square default "transfer/intersection", change the value  above and it will work with any intersection.
        //We get index of both stops.
        const index1 = this["line"+line].indexOf(stopFrom); //Doing it this way it wouldn't matter how many lines/stops there are, it'll still work
        const index2 = this["line"+line].indexOf(stopTo); 
        let direction;
        //We check if we are going backwards or forwards, I reverse the array if we are going backwards. 
        //The addition is to not include the $stopFrom (where person gets on train)
        direction = index1 < index2 ? this["line"+line].slice(index1+1, index2+1) : this["line"+line].slice(index2+1,index1+1).reverse();
        return direction;
    }
}         
console.log(mta.whereTo("N", "Times Square", "Six","Grand Central"));
