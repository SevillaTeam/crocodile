import React, {useState} from "react";
import {LeaderBox} from "../LeaderBox";
import s from "./leaderboard.module.scss"
import {leadersMock} from "../../utlis/mock"

interface Lead {
    points: number,
    name: string
}

function sortLeaders(leads: Lead[]) {
    return leads.sort((a, b) => a.points > b.points ? -1 : 1)
}

export const Leaderboard: React.FC = () => {
    const [leaders] = useState(sortLeaders(leadersMock))

    return (
        <div className={s.leaderboard}>
            {
                leaders.map(({name, points}, idx) =>
                    <LeaderBox key={name} position={idx + 1} name={name} points={points}/>
                )
            }

        </div>
    )
}
