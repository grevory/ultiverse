import { useState, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_LEAGUE = gql`
    mutation CreateLeague($input: LeagueInput!) {
        createLeague(input: $input) {
            id
            name
        }
    }
`;

const CreateLeague: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [createLeague, { data, loading, error }] = useMutation<
        { createLeague: { id: string; name: string; }; },
        { input: { name: string; }; }
    >(CREATE_LEAGUE);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createLeague({ variables: { input: { name } } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h2>Create League</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="League Name"
                />
                <button type="submit">Create</button>
            </form>
            {data && <p>Created League: {data.createLeague.name}</p>}
        </div>
    );
};

export default CreateLeague;
