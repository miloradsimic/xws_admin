import { Injectable } from '@angular/core';
import { Agent } from '../domain/agent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {

  constructor(private client: HttpClient) {
    
  }

  public getAgents(): Observable<Agent[]> {
    return this.client.get<Agent[]>("/backend/agent/agents");
  }

  public createAgent(agent: Agent): Observable<Agent> {
    return this.client.post<Agent>("/backend/agent/agent", agent);
  } 

}
