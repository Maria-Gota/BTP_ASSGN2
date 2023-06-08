package com.example.beconn.dao.notification;

import com.example.beconn.entity.notification.Notification;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationDaoImpl implements NotificationDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Notification getById(Long id) {
        String getById = "SELECT x FROM Notification x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        Notification result = (Notification) query.getSingleResult();
        return result;
    }

    @Override
    public List<Notification> getByRecipientId(Long recipientId) {

        String getByRecipientId = "SELECT x FROM Notification x WHERE x.recipientId =: recipientId ORDER BY x.dispatchDate DESC";
        Query query = entityManager.createQuery(getByRecipientId);
        query.setParameter("recipientId", recipientId);

        List<Notification> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional
    public void create(Notification notification) {
        entityManager.persist(notification);
    }

    @Override
    @Transactional
    public void update(Notification notification) {
        entityManager.merge(notification);
    }


    @Override
    @Transactional
    public void deleteById(Long id) {
        Notification notification = getById(id);
        entityManager.remove(notification);
    }
}
