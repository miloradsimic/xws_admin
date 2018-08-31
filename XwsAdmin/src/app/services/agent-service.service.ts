import { Injectable } from '@angular/core';
import { Agent } from '../domain/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {
  private agents: Agent[];

  constructor() {
    this.agents = [
      {
        email: "pero@mail.com",
        address: "Adresa A",
        name: "Pero Peric",
        role: "Agent",
        tin: "112233"
      },
      {
        email: "jovo@mail.com",
        address: "Adresa B",
        name: "Jovo Jovic",
        role: "Agent",
        tin: "123456"
      },
      {
        email: "boro@mail.com",
        address: "Adresa C",
        name: "Boro Boric",
        role: "Agent",
        tin: "156875"
      },
      {
        email: "zarko@mail.com",
        address: "Adresa D",
        name: "Zarko Zarkovic",
        role: "Agent",
        tin: "659966"
      },
    ]
  }

  public getAgents(): Agent[] {
    return this.agents;
  }

  public createAgent(agent: Agent) {
    this.agents.push(agent);
  } 

}
