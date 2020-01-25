       {isLoading && !user ? (
          <Spin size="large" tip="Загрузка сообщений..." />
        ) : items && !isLoading ? (
          items.length > 0 ? (
            items.map(item => (
              <Message
                {...item}
                isMe={user._id === item.user._id}
                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                setPreviewImage={setPreviewImage}
                key={item._id}
              />
            ))
          ) : (
            <Empty description="Диалог пуст" />
          )
        ) : (
          <Empty description="Откройте диалог" />
        )}