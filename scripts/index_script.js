/**
 * Stub method, this should scroll the page down to the Players section,
 * change the selector value to the appropriate time span
 * and populate it with only players registered during the timespan
 * given by the parameter.
 */
function showPlayersList(timeSpan) {
}

/**
 * Stub method, this should scroll the page down to the Sessions section,
 * change the selector value to the appropriate time span
 * and populate it with only sessions played during the timespan
 * given by the parameter.
 */
function showSessionsList(timeSpan) {
}

function addPlayer() {
    //TO-DO clear all the form fields
    toggleForm("new_player_form", true);
}

function editPlayer() {
    //TO-DO clear all the form fields
    toggleForm("edit_player_form", true);
}

/**
 * Stub method, this should call backend methods to
 * change a player's status to banned and also
 * display that change on the player table.
 */
function banPlayer() {
}

/**
 * Stub method, this should call backend methods to
 * delete a player account and also remove that player
 * from the players table.
 */
function removePlayer() {
}

function addSession() {
    //TO-DO clear all the form fields
    toggleForm("new_session_form", true);
}

function editSession() {
    //TO-DO clear all the form fields
    toggleForm("edit_session_form", true);
}

/**
 * Stub method, this should call backend methods to
 * delete a game session and also remove that player
 * from the sessions table.
 */
function removeSession() {
}

/**
 * Stub method, this should call backend methods to
 * authenticate and login a user account.
 */
function login() {
    toggleForm("login_form", false);
}

function submitPlayerRegister() {
    toggleForm("new_player_form", false);
}

function submitPlayerEdit() {
    toggleForm("edit_player_form", false);
}

function submitSessionRegister() {
    toggleForm("new_session_form", false);
}

function submitSessionEdit() {
    toggleForm("edit_session_form", false);
}

function toggleForm(formId, on) {

    var form = $("#" + formId);
    var darkPane = $("#dark_pane");

    if (on) {
        form.css("display", "inline-block");
        darkPane.show();
    } else {
        form.css("display", "none");
        darkPane.hide();
    }
}