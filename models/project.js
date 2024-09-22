class Project {
    constructor(id, name, description, startDate = new Date(), endDate = new Date(), status, teamMembers = [], budget) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.teamMembers = teamMembers;
        this.budget = budget;
    }
}

module.exports = Project;