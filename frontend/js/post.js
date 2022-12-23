const CHAR_LIMIT = 140;
let uploadedFile = null;

function post() {
    // Actually submit the post
}

function loadPost() {
    getUserName();
    updateProfile();
}

function uploadImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        let files = Array.from(input.files);
        document.getElementById("fileName").innerHTML = "<p>"+files[0].name+"</p>";
        uploadedFile = files[0];
    };
    input.click();
}

function updateCaption() {
    let box = document.getElementById("caption");
    let sample = document.getElementById("captionSample");
    let out = checkCaption(box.value);
    if (out === null) {
        sample.innerHTML = "<p style='color: red;'>Error!</p>"
    } else {
        sample.innerHTML = "<p>"+out+"</p>";
    }

    document.getElementById("charCount").innerHTML = "<p><font size='-2'>"+box.value.length+"/"+CHAR_LIMIT+" characters</font></p>";
}



function checkLetter(code) {
    if (code == 60 || code == 62) {
        // < or >
        return false;
    }
    return true;
}

function processCommand(command) {
    switch (command) {
        case "textbf":
        case "bf":
            // Boldface
            return ["<b>", "</b>"];
        case "it":
        case "textit":
        case "emph":
            // Italics
            return ["<i>", "<\i>"];
        case "<":
            return ["&lt;", null];
        case ">":
            return ["&gt;", null];
        default:
            return null;
    } 
}

function checkCaption(text) {
    // Parses the caption

    let command = false; // Is a command (started with a backslash) being read?
    let commandText = ""; // Contains the command name.
    let outText = ""; // Contains the parsed text.
    let endTagStack = []; // Contains the end tags that should be inserted every }.
    let expectArgument = false; // True if an open brace is expected next.

    if (text.length > CHAR_LIMIT) {
        // Text is too long
        return null;
    }

    for (let i = 0; i < text.length; i++) {
        if (text[i] == '\\') {
            command = true;
            continue;
        }
        if (!command && !checkLetter(text.charCodeAt(i))) {
            return null;
        }
        if (command) {
            if (text[i] == '\n' || text[i] == ' ' || text[i] == '\\' || text[i] == '\{') {
                // End the command
                let commandResult = processCommand(commandText);
                if (commandResult === null) {
                    // Command was a failure
                    return null;
                } else {
                    // Command succeeded
                    outText += commandResult[0];
                    expectArgument = (commandResult[1] !== null);
                    if (expectArgument) {
                        endTagStack.push(commandResult[1]);
                    }
                }
                if (text[i] == '\{') {
                    // Just start the argument now
                    if (!expectArgument) {
                        // There should not have been an open brace.
                        return null;
                    }
                    expectArgument = false;
                }
                command = false;
                commandText = "";
            } else {
                // Command continues
                commandText += text[i];
            }
            continue;
        }
        if (expectArgument) {
            // There should have been an open brace.
            return null;
        }

        if (text[i] == '\}') {
            // End the argument
            let endTag = endTagStack.pop();
            if (endTag === null) {
                // One too many open braces
                return null;
            }
            outText += endTag;
            continue;
        }
        
        // Add the current letter to the output string
        outText += text[i];
    }

    // Process the final command
    if (command) {
        let commandResult = processCommand(commandText);
        if (commandResult === null) {
            // Command was a failure
            return null;
        } else {
            // Command succeeded
            outText += commandResult[0];
            expectArgument = (commandResult[1] !== null);
        }
    }

    // Check the final state
    if (expectArgument) {
        // Expected an argument but this is the end of the caption
        return null;
    }
    if (endTagStack.length > 0) {
        // Not all open braces were closed
        return null;
    }

    return outText;
}