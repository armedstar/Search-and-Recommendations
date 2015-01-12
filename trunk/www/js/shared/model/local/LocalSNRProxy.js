jingo.declare(
{
    require:
    [
        "shared.model.BaseSNRProxy",
        "shared.model.ProgramBrief",
        "shared.model.SearchResult",
        "shared.model.SearchSuggestion"
    ],
    name: 'shared.model.local.LocalSNRProxy',
    as: function() 
    {
    
        shared.model.SNRProxy = function()
        {
            shared.model.BaseSNRProxy.apply(this, [shared.model.SNRProxy.NAME]);
            this._initRecommendationSets();
            this.currRecSetIdx = 0;
        }

        shared.model.SNRProxy.prototype = new shared.model.BaseSNRProxy;
        shared.model.SNRProxy.prototype.parent = shared.model.BaseSNRProxy.prototype;
        shared.model.SNRProxy.prototype.constructor = shared.model.SNRProxy;

        shared.model.SNRProxy.NAME = "SNRProxy";

        shared.model.SNRProxy.prototype.getProfileSeedTitles = function(successCallback, errorCallback)
        {
            //Return a hardcoded list of titles that the user will use to build a profile.
            var testData = new Array();
            testData.push(this._createProgramBrief("111", shared.model.ProgramBrief.MOVIE, "The Dark Knight", "In Christopher Nolan's intense sequel, Batman (Christian Bale) and idealistic DA Harvey Dent join forces to arrest and prosecute Gotham City's crime lords. But the deranged Joker (Heath Ledger) raises the stakes by declaring all-out war", "action/adventure", "2008", "152", null, "images/pages/shared/testdata/darkknight.jpg"));
            testData.push(this._createProgramBrief("222", shared.model.ProgramBrief.MOVIE, "Forrest Gump", "Six Oscars, including Best Picture and Actor (Tom Hanks), went to this extraordinary tale of a simple man who unwittingly becomes involved in some of the key moments of the 20th century.", "drama", "1994", "142", null, "images/pages/shared/testdata/forrestgump.jpg"));
            testData.push(this._createProgramBrief("333", shared.model.ProgramBrief.MOVIE, "The Golden Child", "Eddie Murphy as a social worker who goes to Tibet in search of a missing tot (J.L. Reate) with mystical powers.", "comedy", "1986", "93", null, "images/pages/shared/testdata/golden_child.jpg"));
            testData.push(this._createProgramBrief("444", shared.model.ProgramBrief.MOVIE, "Sideways", "Two restless friends take an impulsive trip through California's wine country the week before one of them gets married. Smartly observant comedy. Paul Giamatti, Thomas Haden Church.", "comedy-drama", "2004", "123", null, "images/pages/shared/testdata/sideways.jpg"));
            testData.push(this._createProgramBrief("555", shared.model.ProgramBrief.MOVIE, "Breakfast at Tiffany's", "Audrey Hepburn stars as Holly Golightly, the heroine of Truman Capote's novel about New York sophisticates. George Peppard, Patricia Neal, Buddy Ebsen, Mickey Rooney", "comedy", "1961", "115", null, "images/pages/shared/testdata/tiffanys.jpg"));

            testData.push(this._createProgramBrief("666", shared.model.ProgramBrief.MOVIE, "The Dark Knight", "In Christopher Nolan's intense sequel, Batman (Christian Bale) and idealistic DA Harvey Dent join forces to arrest and prosecute Gotham City's crime lords. But the deranged Joker (Heath Ledger) raises the stakes by declaring all-out war", "action/adventure", "2008", "152", null, "images/pages/shared/testdata/darkknight.jpg"));
            testData.push(this._createProgramBrief("777", shared.model.ProgramBrief.MOVIE, "Forrest Gump", "Six Oscars, including Best Picture and Actor (Tom Hanks), went to this extraordinary tale of a simple man who unwittingly becomes involved in some of the key moments of the 20th century.", "drama", "1994", "142", null, "images/pages/shared/testdata/forrestgump.jpg"));
            testData.push(this._createProgramBrief("888", shared.model.ProgramBrief.MOVIE, "The Golden Child", "Eddie Murphy as a social worker who goes to Tibet in search of a missing tot (J.L. Reate) with mystical powers.", "comedy", "1986", "93", null, "images/pages/shared/testdata/golden_child.jpg"));
            testData.push(this._createProgramBrief("999", shared.model.ProgramBrief.MOVIE, "Sideways", "Two restless friends take an impulsive trip through California's wine country the week before one of them gets married. Smartly observant comedy. Paul Giamatti, Thomas Haden Church.", "comedy-drama", "2004", "123", null, "images/pages/shared/testdata/sideways.jpg"));
            testData.push(this._createProgramBrief("1010", shared.model.ProgramBrief.MOVIE, "Breakfast at Tiffany's", "Audrey Hepburn stars as Holly Golightly, the heroine of Truman Capote's novel about New York sophisticates. George Peppard, Patricia Neal, Buddy Ebsen, Mickey Rooney", "comedy", "1961", "115", null, "images/pages/shared/testdata/tiffanys.jpg"));

            successCallback(testData);
        }

        shared.model.SNRProxy.prototype._createProgramBrief = function(
            id,
            type,
            title,
            synopsis,
            genre,
            year,
            runtime,
            qualityRating,
            programIconImgSrc,
            largeProgramImage)
        {
            return new shared.model.ProgramBrief(
                id,
                type,
                title,
                synopsis,
                genre,
                year,
                runtime,
                qualityRating,
                programIconImgSrc,
                largeProgramImage,
                this._retrieveContentPreferenceState(id));
        }

        shared.model.SNRProxy.prototype._initRecommendationSets = function()
        {
            var recSets = new Array();
            var currRecSet = new Array();

            currRecSet.push(this._createProgramBrief("1", shared.model.ProgramBrief.MOVIE, "The Absent-Minded Professor", "Fred MacMurray as a scientist whose experiment results in a substance that defies gravity. Nancy Olson, Keenan Wynn. Bill: Tommy Kirk. Fire Chief: Ed Wynn.", "comedy", "1961", "97", "3", "images/pages/shared/testdata/professor.jpg"));

            currRecSet.push(this._createProgramBrief("2", shared.model.ProgramBrief.MOVIE, "The Mask", "Jim Carrey mugs his way through this slapstick farce about a meek bank official who transforms into a super-suave dude when he stumbles upon a mysterious mask.", "comedy", "1994", "91", null, "images/pages/shared/testdata/mask.jpg"));

            currRecSet.push(this._createProgramBrief("3", shared.model.ProgramBrief.MOVIE, "Star Wars", "Six Oscars went to George Lucas's box-office blast, set a long time ago in a galaxy far, far away. Mark Hamill, Harrison Ford, Carrie Fisher", "sci-fi", "1977", "121", null, "images/pages/shared/testdata/starwars.jpg"));

            currRecSet.push(this._createProgramBrief("4", shared.model.ProgramBrief.MOVIE, "The Three Stooges", "Larry, Curly and Moe work to save their childhood home, solve a murder and become reality-TV stars in this comic adventure featuring everyone's favorite knuckleheads.", "comedy", "2012", "91", null, "images/pages/shared/testdata/threestooges.jpg"));

            currRecSet.push(this._createProgramBrief("5", shared.model.ProgramBrief.MOVIE, "21 and Over", "A gifted medical student puts his education in jeopardy when he decides to celebrate his 21st birthday with two rowdy pals the night before a crucial exam.", "comedy", "2013", "93", null, "images/pages/shared/testdata/21over.jpg"));

            currRecSet.push(this._createProgramBrief("6", shared.model.ProgramBrief.MOVIE, "Frankie Go Boom", "Two brothers seek the help of a transgender hacker in removing a sex tape from the Internet before the unhinged father of the woman in the video seeks violent revenge.", "comedy", "2012", "89", null, "images/pages/shared/testdata/frankie.jpg"));

            currRecSet.push(this._createProgramBrief("7", shared.model.ProgramBrief.MOVIE, "Super Troopers", "A squad of Vermont state policemen battle local cops who are trying to get them ousted from the area. Kevin Heffernan, Steve Lemme, Paul Soter, Erik Stolhanske", "comedy", "2001", "102", null, "images/pages/shared/testdata/troopers.jpg"));

            currRecSet.push(this._createProgramBrief("8", shared.model.ProgramBrief.MOVIE, "Men in Black 3: The IMAX 3D Experience", "In this installment of the sci-fi franchise, Agent J travels back in time to 1969 in order to prevent someone from rewriting the course of history. Along the way, he reunites with his partner Agent K, who in 1969 is a young man.", "action/adventure", "2012", "105", null, "images/pages/shared/testdata/mib.jpg"));

            currRecSet.push(this._createProgramBrief("9", shared.model.ProgramBrief.MOVIE, "Men in Black", "Dazzling special effects and sharp wit enhance this humans vs. aliens saga in which a secret-agent duo track extraterrestrials living on Earth. Tommy Lee Jones, Will Smith.", "action/adventure", "1997", "98", null, "images/pages/shared/testdata/mib2.jpg"));

            currRecSet.push(this._createProgramBrief("10", shared.model.ProgramBrief.MOVIE, "Ted", "A child successfully wishes that his teddy bear could come to life, but he gets more than he bargained for when the stuffed animal follows him into adulthood and complicates his relationship with a beautiful woman.", "comedy", "2012", "107", null, "images/pages/shared/testdata/ted.jpg"));

            currRecSet.push(this._createProgramBrief("11", shared.model.ProgramBrief.MOVIE, "Dune", "Extravagant adaptation of Frank Herbert's epic about an interplanetary power struggle for a magic spice. Kyle MacLachlan.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/dune.jpg"));

            currRecSet.push(this._createProgramBrief("12", shared.model.ProgramBrief.MOVIE, "The Matrix", "A computer hacker (Keanu Reeves) is introduced to an alternate reality by a fugitive (Laurence Fishburne). Compelling story, dazzling special effects.", "sci-fi", "1999", "140", null, "images/pages/shared/testdata/matrix.jpg"));

            currRecSet.push(this._createProgramBrief("13", shared.model.ProgramBrief.MOVIE, "Avatar", "In this sci-fi epic, paraplegic war veteran Jake Sully (Sam Worthington) volunteers for a mission on the planet Pandora, a hostile environment where human beings can only survive by remotely controlling alien avatars.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/avatar.jpg"));

            currRecSet.push(this._createProgramBrief("14", shared.model.ProgramBrief.MOVIE, "Blade Runner: The Final Cut", "Updated special effects and extended scenes highlight the definitive version of Ridley Scott's visionary sci-fi thriller about a 21st-century detective (Harrison Ford) assigned to destroy rebellious \"replicants.\" Rutger Hauer, Sean Young, Edward James Olmos. Based on a novel by Philip K. Dick.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/bladerunner.jpg"));

            currRecSet.push(this._createProgramBrief("15", shared.model.ProgramBrief.MOVIE, "Tron: Legacy", "Sam Flynn (Garrett Hedlund) gets sucked into the same virtual world where his father (Jeff Bridges) has been trapped for 20 years, and together the pair attempt to escape their dangerous environment with the help of a fierce warrior named Quorra", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/tron.jpg"));

            currRecSet.push(this._createProgramBrief("16", shared.model.ProgramBrief.MOVIE, "The Fast and the Furious", "Vin Diesel stars as a Los Angeles street racer in this high-energy thriller with over-the-top, non-stop action. Paul Walker plays an undercover cop who infiltrates Diesel's gang", "action/adventure", "1984", "140", null, "images/pages/shared/testdata/fast_furious.jpg"));

            currRecSet.push(this._createProgramBrief("17", shared.model.ProgramBrief.MOVIE, "Total Recall", "A factory worker is branded a spy after an attempt to take a virtual vacation goes horribly awry. Later, he joins an underground resistance movement in order to defeat a high-tech tyrant, and attempts to recover his true identity along the way.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/total_recall.jpg"));

            currRecSet.push(this._createProgramBrief("18", shared.model.ProgramBrief.MOVIE, "The Fifth Element", "A 23rd-century cabbie (Bruce Willis) picks up an alien with the power to save the world from destruction. Great special effects, ludicrous script. Gary Oldman, Milla Jovovich.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/fifth.jpg"));

            currRecSet.push(this._createProgramBrief("19", shared.model.ProgramBrief.MOVIE, "Airplane!", "Wacky takeoff of all those all-star airport movies. Ted Striker: Robert Hays. Elaine: Julie Hagerty. McCroskey: Lloyd Bridges. Captain Oveur: Peter Graves.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/airplane.jpg"));

            currRecSet.push(this._createProgramBrief("20", shared.model.ProgramBrief.MOVIE, "Solaris", "A counselor (George Clooney) reunites with his dead wife on a space station orbiting a mysterious planet. Steven Soderbergh's atmospheric and mind-bending, albeit slow, remake", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/solaris.jpg"));



            recSets.push(currRecSet);

            var currRecSet2 = new Array();

            currRecSet2.push(this._createProgramBrief("1", shared.model.ProgramBrief.MOVIE, "The Absent-Minded Professor", "Fred MacMurray as a scientist whose experiment results in a substance that defies gravity. Nancy Olson, Keenan Wynn. Bill: Tommy Kirk. Fire Chief: Ed Wynn.", "comedy", "1961", "97", "3", "images/pages/shared/testdata/professor.jpg"));

            currRecSet2.push(this._createProgramBrief("21", shared.model.ProgramBrief.MOVIE, "The Perks of Being a Wallflower", "A timid teenager copes with the pains of adolescence with the help of two new friends, a beautiful high-school senior and her gay stepbrother.", "drama", "2012", "113", null, "images/pages/shared/testdata/wallflower.jpg"));

            currRecSet2.push(this._createProgramBrief("3", shared.model.ProgramBrief.MOVIE, "Star Wars", "Six Oscars went to George Lucas's box-office blast, set a long time ago in a galaxy far, far away. Mark Hamill, Harrison Ford, Carrie Fisher", "sci-fi", "1977", "121", null, "images/pages/shared/testdata/starwars.jpg"));

            currRecSet2.push(this._createProgramBrief("4", shared.model.ProgramBrief.MOVIE, "The Three Stooges", "Larry, Curly and Moe work to save their childhood home, solve a murder and become reality-TV stars in this comic adventure featuring everyone's favorite knuckleheads.", "comedy", "2012", "91", null, "images/pages/shared/testdata/threestooges.jpg"));

            currRecSet2.push(this._createProgramBrief("5", shared.model.ProgramBrief.MOVIE, "21 and Over", "A gifted medical student puts his education in jeopardy when he decides to celebrate his 21st birthday with two rowdy pals the night before a crucial exam.", "comedy", "2013", "93", null, "images/pages/shared/testdata/21over.jpg"));

            currRecSet2.push(this._createProgramBrief("6", shared.model.ProgramBrief.MOVIE, "Frankie Go Boom", "Two brothers seek the help of a transgender hacker in removing a sex tape from the Internet before the unhinged father of the woman in the video seeks violent revenge.", "comedy", "2012", "89", null, "images/pages/shared/testdata/frankie.jpg"));

            currRecSet2.push(this._createProgramBrief("7", shared.model.ProgramBrief.MOVIE, "Super Troopers", "A squad of Vermont state policemen battle local cops who are trying to get them ousted from the area. Kevin Heffernan, Steve Lemme, Paul Soter, Erik Stolhanske", "comedy", "2001", "102", null, "images/pages/shared/testdata/troopers.jpg"));

            currRecSet2.push(this._createProgramBrief("8", shared.model.ProgramBrief.MOVIE, "Men in Black 3: The IMAX 3D Experience", "In this installment of the sci-fi franchise, Agent J travels back in time to 1969 in order to prevent someone from rewriting the course of history. Along the way, he reunites with his partner Agent K, who in 1969 is a young man.", "action/adventure", "2012", "105", null, "images/pages/shared/testdata/mib.jpg"));

            currRecSet2.push(this._createProgramBrief("9", shared.model.ProgramBrief.MOVIE, "Men in Black", "Dazzling special effects and sharp wit enhance this humans vs. aliens saga in which a secret-agent duo track extraterrestrials living on Earth. Tommy Lee Jones, Will Smith.", "action/adventure", "1997", "98", null, "images/pages/shared/testdata/mib2.jpg"));

            currRecSet2.push(this._createProgramBrief("10", shared.model.ProgramBrief.MOVIE, "Ted", "A child successfully wishes that his teddy bear could come to life, but he gets more than he bargained for when the stuffed animal follows him into adulthood and complicates his relationship with a beautiful woman.", "comedy", "2012", "107", null, "images/pages/shared/testdata/ted.jpg"));


            currRecSet2.push(this._createProgramBrief("11", shared.model.ProgramBrief.MOVIE, "Dune", "Extravagant adaptation of Frank Herbert's epic about an interplanetary power struggle for a magic spice. Kyle MacLachlan.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/dune.jpg"));

            currRecSet2.push(this._createProgramBrief("12", shared.model.ProgramBrief.MOVIE, "The Matrix", "A computer hacker (Keanu Reeves) is introduced to an alternate reality by a fugitive (Laurence Fishburne). Compelling story, dazzling special effects.", "sci-fi", "1999", "140", null, "images/pages/shared/testdata/matrix.jpg"));

            currRecSet2.push(this._createProgramBrief("13", shared.model.ProgramBrief.MOVIE, "Avatar", "In this sci-fi epic, paraplegic war veteran Jake Sully (Sam Worthington) volunteers for a mission on the planet Pandora, a hostile environment where human beings can only survive by remotely controlling alien avatars.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/avatar.jpg"));

            currRecSet2.push(this._createProgramBrief("14", shared.model.ProgramBrief.MOVIE, "Blade Runner: The Final Cut", "Updated special effects and extended scenes highlight the definitive version of Ridley Scott's visionary sci-fi thriller about a 21st-century detective (Harrison Ford) assigned to destroy rebellious \"replicants.\" Rutger Hauer, Sean Young, Edward James Olmos. Based on a novel by Philip K. Dick.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/bladerunner.jpg"));

            currRecSet2.push(this._createProgramBrief("15", shared.model.ProgramBrief.MOVIE, "Tron: Legacy", "Sam Flynn (Garrett Hedlund) gets sucked into the same virtual world where his father (Jeff Bridges) has been trapped for 20 years, and together the pair attempt to escape their dangerous environment with the help of a fierce warrior named Quorra", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/tron.jpg"));

            currRecSet2.push(this._createProgramBrief("16", shared.model.ProgramBrief.MOVIE, "The Fast and the Furious", "Vin Diesel stars as a Los Angeles street racer in this high-energy thriller with over-the-top, non-stop action. Paul Walker plays an undercover cop who infiltrates Diesel's gang", "action/adventure", "1984", "140", null, "images/pages/shared/testdata/fast_furious.jpg"));

            currRecSet2.push(this._createProgramBrief("17", shared.model.ProgramBrief.MOVIE, "Total Recall", "A factory worker is branded a spy after an attempt to take a virtual vacation goes horribly awry. Later, he joins an underground resistance movement in order to defeat a high-tech tyrant, and attempts to recover his true identity along the way.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/total_recall.jpg"));

            currRecSet2.push(this._createProgramBrief("18", shared.model.ProgramBrief.MOVIE, "The Fifth Element", "A 23rd-century cabbie (Bruce Willis) picks up an alien with the power to save the world from destruction. Great special effects, ludicrous script. Gary Oldman, Milla Jovovich.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/fifth.jpg"));

            currRecSet2.push(this._createProgramBrief("19", shared.model.ProgramBrief.MOVIE, "Airplane!", "Wacky takeoff of all those all-star airport movies. Ted Striker: Robert Hays. Elaine: Julie Hagerty. McCroskey: Lloyd Bridges. Captain Oveur: Peter Graves.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/airplane.jpg"));

            currRecSet2.push(this._createProgramBrief("20", shared.model.ProgramBrief.MOVIE, "Solaris", "A counselor (George Clooney) reunites with his dead wife on a space station orbiting a mysterious planet. Steven Soderbergh's atmospheric and mind-bending, albeit slow, remake", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/solaris.jpg"));



            recSets.push(currRecSet2);

            var currRecSet3 = new Array();
            currRecSet3.push(this._createProgramBrief("1", shared.model.ProgramBrief.MOVIE, "The Absent-Minded Professor", "Fred MacMurray as a scientist whose experiment results in a substance that defies gravity. Nancy Olson, Keenan Wynn. Bill: Tommy Kirk. Fire Chief: Ed Wynn.", "comedy", "1961", "97", "3", "images/pages/shared/testdata/professor.jpg"));

            currRecSet3.push(this._createProgramBrief("21", shared.model.ProgramBrief.MOVIE, "The Perks of Being a Wallflower", "A timid teenager copes with the pains of adolescence with the help of two new friends, a beautiful high-school senior and her gay stepbrother.", "drama", "2012", "113", null, "images/pages/shared/testdata/wallflower.jpg"));

            currRecSet3.push(this._createProgramBrief("3", shared.model.ProgramBrief.MOVIE, "Star Wars", "Six Oscars went to George Lucas's box-office blast, set a long time ago in a galaxy far, far away. Mark Hamill, Harrison Ford, Carrie Fisher", "sci-fi", "1977", "121", null, "images/pages/shared/testdata/starwars.jpg"));

            currRecSet3.push(this._createProgramBrief("5", shared.model.ProgramBrief.MOVIE, "21 and Over", "A gifted medical student puts his education in jeopardy when he decides to celebrate his 21st birthday with two rowdy pals the night before a crucial exam.", "comedy", "2013", "93", null, "images/pages/shared/testdata/21over.jpg"));

            currRecSet3.push(this._createProgramBrief("22", shared.model.ProgramBrief.MOVIE, "Risky Business", "A teenager (Tom Cruise) turns his house into a brothel while his parents are away in this sharp comedy highlighted by Cruise's star-making performance.", "comedy", "1983", "98", null, "images/pages/shared/testdata/risky.jpg"));

            currRecSet3.push(this._createProgramBrief("6", shared.model.ProgramBrief.MOVIE, "Frankie Go Boom", "Two brothers seek the help of a transgender hacker in removing a sex tape from the Internet before the unhinged father of the woman in the video seeks violent revenge.", "comedy", "2012", "89", null, "images/pages/shared/testdata/frankie.jpg"));

            currRecSet3.push(this._createProgramBrief("7", shared.model.ProgramBrief.MOVIE, "Super Troopers", "A squad of Vermont state policemen battle local cops who are trying to get them ousted from the area. Kevin Heffernan, Steve Lemme, Paul Soter, Erik Stolhanske", "comedy", "2001", "102", null, "images/pages/shared/testdata/troopers.jpg"));

            currRecSet3.push(this._createProgramBrief("8", shared.model.ProgramBrief.MOVIE, "Men in Black 3: The IMAX 3D Experience", "In this installment of the sci-fi franchise, Agent J travels back in time to 1969 in order to prevent someone from rewriting the course of history. Along the way, he reunites with his partner Agent K, who in 1969 is a young man.", "action/adventure", "2012", "105", null, "images/pages/shared/testdata/mib.jpg"));

            currRecSet3.push(this._createProgramBrief("9", shared.model.ProgramBrief.MOVIE, "Men in Black", "Dazzling special effects and sharp wit enhance this humans vs. aliens saga in which a secret-agent duo track extraterrestrials living on Earth. Tommy Lee Jones, Will Smith.", "action/adventure", "1997", "98", null, "images/pages/shared/testdata/mib2.jpg"));

            currRecSet3.push(this._createProgramBrief("10", shared.model.ProgramBrief.MOVIE, "Ted", "A child successfully wishes that his teddy bear could come to life, but he gets more than he bargained for when the stuffed animal follows him into adulthood and complicates his relationship with a beautiful woman.", "comedy", "2012", "107", null, "images/pages/shared/testdata/ted.jpg"));


            currRecSet3.push(this._createProgramBrief("11", shared.model.ProgramBrief.MOVIE, "Dune", "Extravagant adaptation of Frank Herbert's epic about an interplanetary power struggle for a magic spice. Kyle MacLachlan.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/dune.jpg"));

            currRecSet3.push(this._createProgramBrief("12", shared.model.ProgramBrief.MOVIE, "The Matrix", "A computer hacker (Keanu Reeves) is introduced to an alternate reality by a fugitive (Laurence Fishburne). Compelling story, dazzling special effects.", "sci-fi", "1999", "140", null, "images/pages/shared/testdata/matrix.jpg"));

            currRecSet3.push(this._createProgramBrief("13", shared.model.ProgramBrief.MOVIE, "Avatar", "In this sci-fi epic, paraplegic war veteran Jake Sully (Sam Worthington) volunteers for a mission on the planet Pandora, a hostile environment where human beings can only survive by remotely controlling alien avatars.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/avatar.jpg"));

            currRecSet3.push(this._createProgramBrief("14", shared.model.ProgramBrief.MOVIE, "Blade Runner: The Final Cut", "Updated special effects and extended scenes highlight the definitive version of Ridley Scott's visionary sci-fi thriller about a 21st-century detective (Harrison Ford) assigned to destroy rebellious \"replicants.\" Rutger Hauer, Sean Young, Edward James Olmos. Based on a novel by Philip K. Dick.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/bladerunner.jpg"));

            currRecSet3.push(this._createProgramBrief("15", shared.model.ProgramBrief.MOVIE, "Tron: Legacy", "Sam Flynn (Garrett Hedlund) gets sucked into the same virtual world where his father (Jeff Bridges) has been trapped for 20 years, and together the pair attempt to escape their dangerous environment with the help of a fierce warrior named Quorra", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/tron.jpg"));

            currRecSet3.push(this._createProgramBrief("16", shared.model.ProgramBrief.MOVIE, "The Fast and the Furious", "Vin Diesel stars as a Los Angeles street racer in this high-energy thriller with over-the-top, non-stop action. Paul Walker plays an undercover cop who infiltrates Diesel's gang", "action/adventure", "1984", "140", null, "images/pages/shared/testdata/fast_furious.jpg"));

            currRecSet3.push(this._createProgramBrief("17", shared.model.ProgramBrief.MOVIE, "Total Recall", "A factory worker is branded a spy after an attempt to take a virtual vacation goes horribly awry. Later, he joins an underground resistance movement in order to defeat a high-tech tyrant, and attempts to recover his true identity along the way.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/total_recall.jpg"));

            currRecSet3.push(this._createProgramBrief("18", shared.model.ProgramBrief.MOVIE, "The Fifth Element", "A 23rd-century cabbie (Bruce Willis) picks up an alien with the power to save the world from destruction. Great special effects, ludicrous script. Gary Oldman, Milla Jovovich.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/fifth.jpg"));

            currRecSet3.push(this._createProgramBrief("19", shared.model.ProgramBrief.MOVIE, "Airplane!", "Wacky takeoff of all those all-star airport movies. Ted Striker: Robert Hays. Elaine: Julie Hagerty. McCroskey: Lloyd Bridges. Captain Oveur: Peter Graves.", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/airplane.jpg"));

            currRecSet3.push(this._createProgramBrief("20", shared.model.ProgramBrief.MOVIE, "Solaris", "A counselor (George Clooney) reunites with his dead wife on a space station orbiting a mysterious planet. Steven Soderbergh's atmospheric and mind-bending, albeit slow, remake", "sci-fi", "1984", "140", null, "images/pages/shared/testdata/solaris.jpg"));


            recSets.push(currRecSet3);

            this.recommendationSets = recSets;
        }

        shared.model.SNRProxy.prototype.like = function(user, programId, programBrief, successCallback, errorCallback)
        {
            if (programBrief)
            {
                programBrief.preferenceState = ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE;
            }
            
            this._storeContentPreferenceState(programId, ContentPreferenceStateConstants.PREFERENCE_STATE_LIKE);
            this._storeContentPreferenceEvent(programBrief);
            
            successCallback();
        }

        shared.model.SNRProxy.prototype.dislike = function(user, programId, programBrief, successCallback, errorCallback)
        {
            if (programBrief)
            {
                programBrief.preferenceState = ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE;
            }
            
            this._storeContentPreferenceState(programId, ContentPreferenceStateConstants.PREFERENCE_STATE_DISLIKE);
            this._storeContentPreferenceEvent(programBrief);
            
            successCallback();
        }

        shared.model.SNRProxy.prototype.getRecommendations = function(user, successCallback, errorCallback)
        {
            // test impl
            if (this.currRecSetIdx == 3)
                this.currRecSetIdx = 0;

            var recSet = this.recommendationSets[this.currRecSetIdx++]; //TODO add variance.
            this._flagNewContentRecommendations(recSet);
            this._storeCurrentContentRecommendations(recSet);

            successCallback(recSet);
        }
        
        shared.model.SNRProxy.prototype.getSearchSuggestions = function(queryStr, successCallback, errorCallback)
        {
            //TEST DATA
            var results = new Array();
            for (var i = 1; i <= 10; i++)
            {
                results.push(new shared.model.SearchSuggestion("Test Movie " + i));
            }
            successCallback(results);
        }

        shared.model.SNRProxy.prototype.search = function(queryStr, successCallback, errorCallback)
        {
            //TEST DATA
            var results = new Array();
            for (var i = 1; i <= 10; i++)
            {
                //TODO: implement as a search result data structure (need box art, synopsis, etc.)
                var id = "id_testresult_" + i;
                results.push(
                    new shared.model.SearchResult(
                        id, 
                        shared.model.SearchResult.MOVIE, 
                        "Test Result " + i,
                        "images/pages/shared/testdata/darkknight.jpg",
                        "2011",
                        "comedy",
                        this._retrieveContentPreferenceState(id)));
            }
            successCallback(results);
        }

        shared.model.SNRProxy.prototype.getSimilarContent = function(programId, successCallback, errorCallback)
        {
            // NOTE:  (WK) Simply using the existing set in order to allow for visible changes.
            if (this.currRecSetIdx == 3)
                this.currRecSetIdx = 0;

            var recSet = this.recommendationSets[this.currRecSetIdx++]; //TODO add variance.

            successCallback(recSet);
        }
              
        shared.model.SNRProxy.prototype.getEntityInfo = function(entityId, successCallback, errorCallback)
        {
              //TEST DATA
              var result = this._createProgramBrief("10", shared.model.ProgramBrief.MOVIE, "Ted", "A child successfully wishes that his teddy bear could come to life, but he gets more than he bargained for when the stuffed animal follows him into adulthood and complicates his relationship with a beautiful woman.", "comedy", "2012", "107", null, "images/pages/shared/testdata/ted.jpg", "images/pages/shared/testdata/ted_big.jpg");
              
              result.director = "Seth MacFarlane";
              result.cast = "Mark Wahlberg, Mila Kunis, Seth MacFarlane";
              successCallback(result);
        }
        
        shared.model.SNRProxy.prototype.getUserTasteProfile = function(user, successCallback, errorCallback)
        {
            successCallback(new Array());
        }
        
        shared.model.SNRProxy.prototype.getItemTasteProfile = function(programId, successCallback, errorCallback)
        {
            successCallback(new Array());
        }

    }
});