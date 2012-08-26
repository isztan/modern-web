function Game(homeTeam, guestTeam) {
    this.home  = homeTeam;
    this.guest = guestTeam;
    this.score = { home: 0, guest: 0 };
}

Game.prototype.homeScores = function() {
    this.score.home++;
};

Game.prototype.guestScores = function() {
    this.score.guest++;
}

Game.prototype.getScore = function() {
    var ret = {};
    ret[this.home] = this.score.home;
    ret[this.guest] = this.score.guest;
    return ret;
}

// -------[ Soccer ]-------

Common.inherit(Game, Soccer);
function Soccer(homeTeam, guestTeam) {
    this.super(homeTeam, guestTeam);
}

// -------[ Basketball ]-------

Common.inherit(Game, Basketball);
function Basketball(homeTeam, guestTeam) {
    this.super(homeTeam, guestTeam);
}

Basketball.prototype.homeScores = function(score) {
    if (typeof score == 'undefined') score = 2;
    this.score.home += score;
};

Basketball.prototype.guestScores = function(score) {
    if (typeof score == 'undefined') score = 2;
    this.score.guest += score;
};