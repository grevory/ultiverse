const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        leagues: [League]
        league(id: ID!): League
        teams: [Team]
        team(id: ID!): Team
        players: [Player]
        player(id: ID!): Player
    }

    type Mutation {
        createLeague(input: LeagueInput): League
        updateLeague(id: ID!, input: LeagueInput): League
        deleteLeague(id: ID!): League
        draftPlayer(teamId: ID!, playerId: ID!): Player
    }

    type League {
        id: ID!
        name: String!
        managers: [User]
        teams: [Team]
    }

    type Team {
        id: ID!
        name: String!
        manager: User
        players: [Player]
    }

    type Player {
        id: ID!
        name: String!
        statistics: PlayerStatistics
    }

    type User {
        id: ID!
        username: String!
        roles: [String] # Roles include: SuperAdmin, LeagueManager, TeamManager
    }

    input LeagueInput {
        name: String!
    }

    type PlayerStatistics {
        gamesPlayed: Int
        goals: Int
        assists: Int
    }
`

module.exports = typeDefs
