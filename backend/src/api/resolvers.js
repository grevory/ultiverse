const { AuthenticationError } = require('apollo-server-express')
const admin = require('firebase-admin')
const { db } = require('../config/firebase')

const resolvers = {
    Query: {
        leagues: async () => {
            const leaguesSnapshot = await db.collection('leagues').get()
            return leaguesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        },
        league: async (_, { id }) => {
            const leagueDoc = await db.collection('leagues').doc(id).get()
            if (!leagueDoc.exists) throw new Error('League not found')
            return { id: leagueDoc.id, ...leagueDoc.data() }
        },
        teams: async () => {
            const teamsSnapshot = await db.collection('teams').get()
            return teamsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        },
        team: async (_, { id }) => {
            const teamDoc = await db.collection('teams').doc(id).get()
            if (!teamDoc.exists) throw new Error('Team not found')
            return { id: teamDoc.id, ...teamDoc.data() }
        },
        players: async () => {
            const playersSnapshot = await db.collection('players').get()
            return playersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        },
        player: async (_, { id }) => {
            const playerDoc = await db.collection('players').doc(id).get()
            if (!playerDoc.exists) throw new Error('Player not found')
            return { id: playerDoc.id, ...playerDoc.data() }
        },
    },

    Mutation: {
        createLeague: async (_, { input }) => {
            const timestamp = new Date();
            const leagueData = {
              ...input,
              dateCreated: timestamp,
              dateModified: timestamp
            };
            const leagueRef = await db.collection('leagues').add(leagueData);
            const leagueDoc = await leagueRef.get();
            return { id: leagueDoc.id, ...leagueDoc.data() };
          },
        updateLeague: async (_, { id, input }) => {
            const leagueRef = db.collection('leagues').doc(id)
            await leagueRef.update(input)
            const leagueDoc = await leagueRef.get()
            return { id: leagueDoc.id, ...leagueDoc.data() }
        },
        deleteLeague: async (_, { id }) => {
            const leagueRef = db.collection('leagues').doc(id)
            await leagueRef.delete()
            return { id }
        },
        draftPlayer: async (_, { teamId, playerId }) => {
            const teamRef = db.collection('teams').doc(teamId)
            const playerRef = db.collection('players').doc(playerId)

            const teamDoc = await teamRef.get()
            const playerDoc = await playerRef.get()

            if (!teamDoc.exists) throw new Error('Team not found')
            if (!playerDoc.exists) throw new Error('Player not found')

            const teamData = teamDoc.data()
            const playerData = playerDoc.data()

            await teamRef.update({
                players: admin.firestore.FieldValue.arrayUnion(playerData),
            })

            return { id: playerDoc.id, ...playerDoc.data() }
        },
    },
}

module.exports = resolvers
